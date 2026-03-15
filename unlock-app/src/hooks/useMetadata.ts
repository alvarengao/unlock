// ABOUTME: Utilities and React hook for loading lock NFT metadata safely.
// ABOUTME: Supports data URIs, fetch timeouts, and abort signal composition.
import { useState, useEffect } from 'react'
import { useWeb3Service } from '~/utils/withWeb3Service'
import { rewriteIpfsUrl } from '../utils/url'

const defaultMetadata = {
  image: '/images/svg/default-lock-logo.svg',
  name: 'NFT Membership',
}

const DEFAULT_FETCH_TIMEOUT = 10_000

type FetchWithTimeoutOptions = RequestInit & {
  timeout?: number
}

export const parseDataJsonUri = (
  uri: string
): Record<string, unknown> | null => {
  if (!uri.startsWith('data:application/json')) {
    return null
  }

  const separatorIndex = uri.indexOf(',')
  if (separatorIndex === -1) {
    return null
  }

  const payload = uri.slice(separatorIndex + 1)
  const isBase64 = uri.includes(';base64,')

  try {
    const decoded = isBase64 ? atob(payload) : decodeURIComponent(payload)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

const createCombinedAbortSignal = (
  controller: AbortController,
  externalSignal?: AbortSignal
) => {
  if (!externalSignal) {
    return {
      signal: controller.signal,
      cleanup: () => undefined,
    }
  }

  if (externalSignal.aborted) {
    controller.abort(externalSignal.reason)
  }

  const abortFromExternalSignal = () => {
    controller.abort(externalSignal.reason)
  }

  externalSignal.addEventListener('abort', abortFromExternalSignal, {
    once: true,
  })

  if (typeof AbortSignal.any === 'function') {
    return {
      signal: AbortSignal.any([controller.signal, externalSignal]),
      cleanup: () => {
        externalSignal.removeEventListener('abort', abortFromExternalSignal)
      },
    }
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      externalSignal.removeEventListener('abort', abortFromExternalSignal)
    },
  }
}

export const fetchWithTimeout = async (
  url: string,
  {
    timeout = DEFAULT_FETCH_TIMEOUT,
    signal,
    ...init
  }: FetchWithTimeoutOptions = {}
) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  const { signal: mergedSignal, cleanup } = createCombinedAbortSignal(
    controller,
    signal
  )

  try {
    return await fetch(url, {
      ...init,
      signal: mergedSignal,
    })
  } finally {
    clearTimeout(timeoutId)
    cleanup()
  }
}

export const safeFetchJson = async (
  url: string,
  options?: FetchWithTimeoutOptions
) => {
  const response = await fetchWithTimeout(url, options)

  if (!response.ok) {
    throw new Error(`Failed metadata fetch (${response.status})`)
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.toLowerCase().includes('json')) {
    throw new Error(
      `Unexpected metadata content-type: ${contentType || 'none'}`
    )
  }

  return JSON.parse(await response.text())
}

/**
 * This hook retrieves metadata for a token
 * @param {*} address
 */
export const useMetadata = (
  lockAddress: string,
  tokenId?: string,
  network?: number
) => {
  const [metadata, setMetadata] = useState(defaultMetadata)
  const web3Service = useWeb3Service()

  useEffect(() => {
    const getMetadata = async () => {
      let tokenMetadata = defaultMetadata
      try {
        const tokenURI = await web3Service.tokenURI(
          lockAddress,
          tokenId!,
          network!
        )
        const dataUriMetadata = parseDataJsonUri(tokenURI)
        tokenMetadata = dataUriMetadata
          ? dataUriMetadata
          : await safeFetchJson(rewriteIpfsUrl(tokenURI))
        tokenMetadata.image = rewriteIpfsUrl(tokenMetadata.image)
      } catch (error) {
        // Do not fail on error, we'll keep defaulting to the default values
        console.error(
          `We could not retrieve the metadata for ${lockAddress}, ${tokenId} on ${network}: ${error}`
        )
      }
      setMetadata(tokenMetadata)
    }
    getMetadata()
  }, [web3Service, lockAddress, tokenId, network])
  return metadata
}

export default useMetadata
