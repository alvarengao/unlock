// ABOUTME: Unit tests for metadata parsing and guarded metadata fetch helpers.
// ABOUTME: Verifies data URI decoding, JSON validation, and abort/timeout behavior.
import { vi, describe, it, expect, beforeEach } from 'vitest'
import {
  fetchWithTimeout,
  parseDataJsonUri,
  safeFetchJson,
} from '../useMetadata'

describe('parseDataJsonUri', () => {
  it('parses base64 JSON data URI', () => {
    const json = btoa(JSON.stringify({ name: 'NFT Test' }))
    const uri = `data:application/json;base64,${json}`

    const result = parseDataJsonUri(uri)

    expect(result?.name).toBe('NFT Test')
  })

  it('parses plain JSON data URI', () => {
    const uri =
      'data:application/json,{"name":"Plain NFT","image":"ipfs://test"}'

    const result = parseDataJsonUri(uri)

    expect(result?.name).toBe('Plain NFT')
  })

  it('returns null for invalid JSON', () => {
    const uri = 'data:application/json,INVALID'

    const result = parseDataJsonUri(uri)

    expect(result).toBeNull()
  })
})

describe('safeFetchJson', () => {
  beforeEach(() => {
    global.fetch = vi.fn() as unknown as typeof fetch
  })

  it('returns parsed JSON when response is valid', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      headers: {
        get: () => 'application/json',
      },
      text: async () => JSON.stringify({ name: 'Remote NFT' }),
    } as Response)

    const result = await safeFetchJson('https://example.com/meta.json')

    expect(result.name).toBe('Remote NFT')
  })

  it('throws error for non JSON response', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      headers: {
        get: () => 'text/html',
      },
      text: async () => '<html></html>',
    } as Response)

    await expect(safeFetchJson('https://example.com/meta')).rejects.toThrow(
      'Unexpected metadata content-type: text/html'
    )
  })
})

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('uses timeout even when external signal is provided', async () => {
    vi.useFakeTimers()

    const mockFetch = vi.fn(
      (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(new Error('aborted'))
          })
        })
    )

    global.fetch = mockFetch as unknown as typeof fetch

    const externalController = new AbortController()
    const request = fetchWithTimeout('https://example.com/meta', {
      timeout: 5,
      signal: externalController.signal,
    })
    const assertion = expect(request).rejects.toThrow('aborted')

    await vi.advanceTimersByTimeAsync(6)

    await assertion
    vi.useRealTimers()
  })
})
