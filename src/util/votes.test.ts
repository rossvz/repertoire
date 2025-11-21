import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  isUpvoted,
  readVotesFromStorage,
  toggleVoteInStorage,
  removeVoteFromStorage,
} from './votes'
import type { Vote } from '../types'

describe('votes', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('readVotesFromStorage', () => {
    it('returns empty array when no votes are stored', () => {
      expect(readVotesFromStorage()).toEqual([])
    })

    it('returns votes from storage', () => {
      const now = Date.now() / 1000
      const votes: Vote[] = [
        { songId: 'song1', date: now },
        { songId: 'song2', date: now },
      ]
      localStorage.setItem('persistedVotes', JSON.stringify(votes))

      expect(readVotesFromStorage()).toEqual(votes)
    })

    it('filters out votes that are not from today', () => {
      const now = Date.now() / 1000
      const yesterday = now - 86400
      const votes: Vote[] = [
        { songId: 'song1', date: now },
        { songId: 'song2', date: yesterday },
      ]
      localStorage.setItem('persistedVotes', JSON.stringify(votes))

      const result = readVotesFromStorage()
      expect(result).toHaveLength(1)
      expect(result[0].songId).toBe('song1')
    })

    it('handles invalid JSON in storage', () => {
      localStorage.setItem('persistedVotes', 'invalid json')
      expect(() => readVotesFromStorage()).toThrow()
    })
  })

  describe('isUpvoted', () => {
    it('returns false when song is not upvoted', () => {
      expect(isUpvoted('song1')).toBe(false)
    })

    it('returns true when song is upvoted', () => {
      const now = Date.now() / 1000
      const votes: Vote[] = [{ songId: 'song1', date: now }]
      localStorage.setItem('persistedVotes', JSON.stringify(votes))

      expect(isUpvoted('song1')).toBe(true)
    })

    it('returns false for different song id', () => {
      const now = Date.now() / 1000
      const votes: Vote[] = [{ songId: 'song1', date: now }]
      localStorage.setItem('persistedVotes', JSON.stringify(votes))

      expect(isUpvoted('song2')).toBe(false)
    })
  })

  describe('toggleVoteInStorage', () => {
    it('adds vote when song is not upvoted', () => {
      toggleVoteInStorage('song1')

      const votes = readVotesFromStorage()
      expect(votes).toHaveLength(1)
      expect(votes[0].songId).toBe('song1')
      expect(votes[0].date).toBeTypeOf('number')
    })

    it('removes vote when song is already upvoted', () => {
      const now = Date.now() / 1000
      const votes: Vote[] = [{ songId: 'song1', date: now }]
      localStorage.setItem('persistedVotes', JSON.stringify(votes))

      toggleVoteInStorage('song1')

      expect(readVotesFromStorage()).toEqual([])
    })

    it('toggles vote twice returns to original state', () => {
      toggleVoteInStorage('song1')
      toggleVoteInStorage('song1')

      expect(readVotesFromStorage()).toEqual([])
    })
  })

  describe('removeVoteFromStorage', () => {
    it('removes specific vote', () => {
      const now = Date.now() / 1000
      const votes: Vote[] = [
        { songId: 'song1', date: now },
        { songId: 'song2', date: now },
      ]
      localStorage.setItem('persistedVotes', JSON.stringify(votes))

      removeVoteFromStorage('song1')

      const result = readVotesFromStorage()
      expect(result).toHaveLength(1)
      expect(result[0].songId).toBe('song2')
    })

    it('does nothing when vote does not exist', () => {
      const now = Date.now() / 1000
      const votes: Vote[] = [{ songId: 'song1', date: now }]
      localStorage.setItem('persistedVotes', JSON.stringify(votes))

      removeVoteFromStorage('song2')

      expect(readVotesFromStorage()).toEqual(votes)
    })

    it('handles empty storage', () => {
      removeVoteFromStorage('song1')
      expect(readVotesFromStorage()).toEqual([])
    })
  })
})
