import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSongs } from './useSongs'
import * as reactfire from 'reactfire'
import * as firebaseDatabase from 'firebase/database'
import type { Song } from '../../../types'

vi.mock('reactfire')
vi.mock('firebase/database')

describe('useSongs', () => {
  const mockDatabase = {}
  const mockSongsRef = {}
  const mockSongsQuery = {}

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(reactfire.useDatabase).mockReturnValue(mockDatabase as any)
    vi.mocked(firebaseDatabase.ref).mockReturnValue(mockSongsRef as any)
    vi.mocked(firebaseDatabase.query).mockReturnValue(mockSongsQuery as any)
  })

  it('should return empty array when no data', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: null,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs).toEqual([])
    expect(result.current.status).toBe('success')
  })

  it('should return and sort songs by votes (descending)', () => {
    const mockSongs: Song[] = [
      {
        id: 'song1',
        title: 'Song A',
        artist: 'Artist 1',
        votes: 5,
        visible: true,
        albumArt: '',
      },
      {
        id: 'song2',
        title: 'Song B',
        artist: 'Artist 2',
        votes: 10,
        visible: true,
        albumArt: '',
      },
      {
        id: 'song3',
        title: 'Song C',
        artist: 'Artist 3',
        votes: 3,
        visible: true,
        albumArt: '',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs).toHaveLength(3)
    expect(result.current.songs[0].votes).toBe(10)
    expect(result.current.songs[1].votes).toBe(5)
    expect(result.current.songs[2].votes).toBe(3)
  })

  it('should prioritize visible songs over hidden songs', () => {
    const mockSongs: Song[] = [
      {
        id: 'song1',
        title: 'Hidden Song',
        artist: 'Artist 1',
        votes: 100,
        visible: false,
        albumArt: '',
      },
      {
        id: 'song2',
        title: 'Visible Song',
        artist: 'Artist 2',
        votes: 1,
        visible: true,
        albumArt: '',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs[0].visible).toBe(true)
    expect(result.current.songs[0].title).toBe('Visible Song')
    expect(result.current.songs[1].visible).toBe(false)
  })

  it('should sort alphabetically by title when votes are equal', () => {
    const mockSongs: Song[] = [
      {
        id: 'song1',
        title: 'Zebra',
        artist: 'Artist 1',
        votes: 5,
        visible: true,
        albumArt: '',
      },
      {
        id: 'song2',
        title: 'Apple',
        artist: 'Artist 2',
        votes: 5,
        visible: true,
        albumArt: '',
      },
      {
        id: 'song3',
        title: 'Mango',
        artist: 'Artist 3',
        votes: 5,
        visible: true,
        albumArt: '',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs[0].title).toBe('Apple')
    expect(result.current.songs[1].title).toBe('Mango')
    expect(result.current.songs[2].title).toBe('Zebra')
  })

  it('should filter songs by search term (title)', () => {
    const mockSongs: Song[] = [
      {
        id: 'song1',
        title: 'Happy Song',
        artist: 'Artist 1',
        votes: 5,
        visible: true,
        albumArt: '',
      },
      {
        id: 'song2',
        title: 'Sad Song',
        artist: 'Artist 2',
        votes: 3,
        visible: true,
        albumArt: '',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs('Happy'))

    expect(result.current.songs).toHaveLength(1)
    expect(result.current.songs[0].title).toBe('Happy Song')
  })

  it('should filter songs by search term (artist)', () => {
    const mockSongs: Song[] = [
      {
        id: 'song1',
        title: 'Song 1',
        artist: 'The Beatles',
        votes: 5,
        visible: true,
        albumArt: '',
      },
      {
        id: 'song2',
        title: 'Song 2',
        artist: 'Led Zeppelin',
        votes: 3,
        visible: true,
        albumArt: '',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs('beatles'))

    expect(result.current.songs).toHaveLength(1)
    expect(result.current.songs[0].artist).toBe('The Beatles')
  })

  it('should handle empty search filter', () => {
    const mockSongs: Song[] = [
      {
        id: 'song1',
        title: 'Song 1',
        artist: 'Artist 1',
        votes: 5,
        visible: true,
        albumArt: '',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs(''))

    expect(result.current.songs).toHaveLength(1)
  })

  it('should create query with correct parameters', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: [],
    } as any)

    renderHook(() => useSongs())

    expect(firebaseDatabase.ref).toHaveBeenCalledWith(mockDatabase, 'songs')
    expect(firebaseDatabase.query).toHaveBeenCalled()
  })

  it('should handle loading status', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'loading',
      data: null,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.status).toBe('loading')
    expect(result.current.songs).toEqual([])
  })

  it('should memoize songs data', () => {
    const mockSongs: Song[] = [
      {
        id: 'song1',
        title: 'Song 1',
        artist: 'Artist 1',
        votes: 5,
        visible: true,
        albumArt: '',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result, rerender } = renderHook(() => useSongs())
    const firstRender = result.current.songs

    rerender()
    const secondRender = result.current.songs

    expect(firstRender).toBe(secondRender)
  })

  it('should recalculate when search filter changes', () => {
    const mockSongs: Song[] = [
      {
        id: 'song1',
        title: 'Happy Song',
        artist: 'Artist 1',
        votes: 5,
        visible: true,
        albumArt: '',
      },
      {
        id: 'song2',
        title: 'Sad Song',
        artist: 'Artist 2',
        votes: 3,
        visible: true,
        albumArt: '',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result, rerender } = renderHook(
      ({ filter }) => useSongs(filter),
      { initialProps: { filter: 'Happy' } }
    )

    expect(result.current.songs).toHaveLength(1)

    rerender({ filter: 'Sad' })

    expect(result.current.songs).toHaveLength(1)
    expect(result.current.songs[0].title).toBe('Sad Song')
  })
})
