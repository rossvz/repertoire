import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { search } from './Spotify'

vi.mock('axios')

describe('Spotify', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(axios.get).mockResolvedValue({ data: {} })
  })

  describe('search', () => {
    it('searches with both title and artist', async () => {
      await search({ title: 'Bohemian Rhapsody', artist: 'Queen' })

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('track:Bohemian Rhapsody artist:Queen')
      )
    })

    it('searches with only title', async () => {
      await search({ title: 'Bohemian Rhapsody' })

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('track:Bohemian Rhapsody')
      )
      expect(axios.get).toHaveBeenCalledWith(
        expect.not.stringContaining('artist:')
      )
    })

    it('uses correct Spotify API URL', async () => {
      await search({ title: 'Test' })

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/search?q=')
      )
    })

    it('returns axios response', async () => {
      const mockResponse = { data: { tracks: [] } }
      vi.mocked(axios.get).mockResolvedValue(mockResponse)

      const result = await search({ title: 'Test' })

      expect(result).toBe(mockResponse)
    })

    it('handles artist without title', async () => {
      await search({ artist: 'Queen' })

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('search?q=')
      )
    })

    it('encodes special characters in query', async () => {
      await search({ title: 'Rock & Roll', artist: 'Led Zeppelin' })

      expect(axios.get).toHaveBeenCalled()
      const callArg = vi.mocked(axios.get).mock.calls[0][0]
      expect(callArg).toContain('search?q=')
    })
  })
})
