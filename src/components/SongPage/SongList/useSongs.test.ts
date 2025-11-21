import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSongs } from './useSongs'
import * as reactfire from 'reactfire'

vi.mock('reactfire')

describe('useSongs', () => {
  const mockDatabase = {}
  const mockRef = vi.fn()
  const mockQuery = vi.fn()
  const mockOrderByChild = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(reactfire.useDatabase).mockReturnValue(mockDatabase as any)
  })

  it('should return loading status when data is loading', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'loading',
      data: undefined,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.status).toBe('loading')
    expect(result.current.songs).toEqual([])
  })

  it('should return empty array when no songs', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: [],
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.status).toBe('success')
    expect(result.current.songs).toEqual([])
  })

  it('should sort songs by votes (descending)', () => {
    const mockSongs = [
      { id: '1', title: 'Song A', votes: 5, visible: true, artist: 'Artist 1' },
      { id: '2', title: 'Song B', votes: 10, visible: true, artist: 'Artist 2' },
      { id: '3', title: 'Song C', votes: 7, visible: true, artist: 'Artist 3' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs[0].votes).toBe(10)
    expect(result.current.songs[1].votes).toBe(7)
    expect(result.current.songs[2].votes).toBe(5)
  })

  it('should prioritize visible songs over invisible ones', () => {
    const mockSongs = [
      { id: '1', title: 'Song A', votes: 10, visible: false, artist: 'Artist 1' },
      { id: '2', title: 'Song B', votes: 5, visible: true, artist: 'Artist 2' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs[0].visible).toBe(true)
    expect(result.current.songs[1].visible).toBe(false)
  })

  it('should sort alphabetically when votes are equal', () => {
    const mockSongs = [
      { id: '1', title: 'Zebra', votes: 5, visible: true, artist: 'Artist 1' },
      { id: '2', title: 'Apple', votes: 5, visible: true, artist: 'Artist 2' },
      { id: '3', title: 'Banana', votes: 5, visible: true, artist: 'Artist 3' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs())

    expect(result.current.songs[0].title).toBe('Apple')
    expect(result.current.songs[1].title).toBe('Banana')
    expect(result.current.songs[2].title).toBe('Zebra')
  })

  it('should filter songs by search term (title)', () => {
    const mockSongs = [
      { id: '1', title: 'Wonderwall', votes: 5, visible: true, artist: 'Oasis' },
      { id: '2', title: 'Yellow', votes: 10, visible: true, artist: 'Coldplay' },
      { id: '3', title: 'Fix You', votes: 7, visible: true, artist: 'Coldplay' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs('yellow'))

    expect(result.current.songs.length).toBe(1)
    expect(result.current.songs[0].title).toBe('Yellow')
  })

  it('should filter songs by search term (artist)', () => {
    const mockSongs = [
      { id: '1', title: 'Wonderwall', votes: 5, visible: true, artist: 'Oasis' },
      { id: '2', title: 'Yellow', votes: 10, visible: true, artist: 'Coldplay' },
      { id: '3', title: 'Fix You', votes: 7, visible: true, artist: 'Coldplay' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs('coldplay'))

    expect(result.current.songs.length).toBe(2)
    expect(result.current.songs[0].artist).toBe('Coldplay')
    expect(result.current.songs[1].artist).toBe('Coldplay')
  })

  it('should filter case-insensitively', () => {
    const mockSongs = [
      { id: '1', title: 'Wonderwall', votes: 5, visible: true, artist: 'Oasis' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockSongs,
    } as any)

    const { result } = renderHook(() => useSongs('WONDER'))

    expect(result.current.songs.length).toBe(1)
    expect(result.current.songs[0].title).toBe('Wonderwall')
  })
})
