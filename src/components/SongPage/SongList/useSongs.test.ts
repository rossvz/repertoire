import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSongs } from './useSongs'
import type { Song } from '../../../types'
import * as reactfire from 'reactfire'

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  query: vi.fn(),
  orderByChild: vi.fn(),
}))

describe('useSongs', () => {
  const mockSongs: Song[] = [
    {
      id: '1',
      title: 'Song A',
      artist: 'Artist 1',
      votes: 5,
      visible: true,
      addedBy: 'user1',
    },
    {
      id: '2',
      title: 'Song B',
      artist: 'Artist 2',
      votes: 10,
      visible: true,
      addedBy: 'user1',
    },
    {
      id: '3',
      title: 'Song C',
      artist: 'Artist 3',
      votes: 3,
      visible: false,
      addedBy: 'user1',
    },
    {
      id: '4',
      title: 'Hidden Song',
      artist: 'Artist 4',
      votes: 15,
      visible: false,
      addedBy: 'user1',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns empty array when no data is available', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'loading',
      data: null,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs).toEqual([])
    expect(result.current.status).toBe('loading')
  })

  it('sorts songs with visible songs first, then by votes descending', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs).toHaveLength(4)
    expect(result.current.songs[0].id).toBe('2')
    expect(result.current.songs[1].id).toBe('1')
    expect(result.current.songs[2].id).toBe('4')
    expect(result.current.songs[3].id).toBe('3')
  })

  it('sorts songs by title when votes are equal', () => {
    const songsWithEqualVotes: Song[] = [
      {
        id: '1',
        title: 'Zebra',
        artist: 'Artist 1',
        votes: 5,
        visible: true,
        addedBy: 'user1',
      },
      {
        id: '2',
        title: 'Apple',
        artist: 'Artist 2',
        votes: 5,
        visible: true,
        addedBy: 'user1',
      },
    ]

    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: songsWithEqualVotes,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs[0].title).toBe('Apple')
    expect(result.current.songs[1].title).toBe('Zebra')
  })

  it('filters songs by search term in title', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs('Song B'))

    expect(result.current.songs).toHaveLength(1)
    expect(result.current.songs[0].title).toBe('Song B')
  })

  it('filters songs by search term in artist', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs('Artist 3'))

    expect(result.current.songs).toHaveLength(1)
    expect(result.current.songs[0].artist).toBe('Artist 3')
  })

  it('handles empty search filter', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs(''))

    expect(result.current.songs).toHaveLength(4)
  })

  it('returns success status when data is loaded', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.status).toBe('success')
  })

  it('memoizes songs based on data and search filter', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result, rerender } = renderHook(
      ({ filter }) => useSongs(filter),
      { initialProps: { filter: '' } }
    )

    const firstResult = result.current.songs

    rerender({ filter: '' })

    expect(result.current.songs).toBe(firstResult)
  })
})
