import { parseDataJsonUri, safeFetchJson } from '../useMetadata'

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
    global.fetch = jest.fn() as jest.Mock
  })

  it('returns parsed JSON when response is valid', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      headers: {
        get: () => 'application/json',
      },
      text: async () => JSON.stringify({ name: 'Remote NFT' }),
    })

    const result = await safeFetchJson('https://example.com/meta.json')

    expect(result.name).toBe('Remote NFT')
  })

  it('throws error for non JSON response', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      headers: {
        get: () => 'text/html',
      },
      text: async () => '<html></html>',
    })

    await expect(
      safeFetchJson('https://example.com/meta')
    ).rejects.toThrow()
  })
})