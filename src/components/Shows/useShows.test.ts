import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useShows } from './useShows'
import * as reactfire from 'reactfire'
import * as firebaseDatabase from 'firebase/database'

vi.mock('reactfire')
vi.mock('firebase/database')

describe('useShows', () => {
  const mockDatabase = {}
  const mockShowsRef = {}
  const mockShowsQuery = {}

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(reactfire.useDatabase).mockReturnValue(mockDatabase as any)
    vi.mocked(firebaseDatabase.ref).mockReturnValue(mockShowsRef as any)
    vi.mocked(firebaseDatabase.query).mockReturnValue(mockShowsQuery as any)
  })

  it('should return empty array when no data', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: null,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.shows).toEqual([])
    expect(result.current.status).toBe('success')
  })

  it('should format and return shows data', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)

    const mockShows = [
      {
        id: 'show1',
        date: tomorrow.toISOString().split('T')[0],
        venue: 'Test Venue',
        city: 'Test City',
        state: 'TS',
        lat: 0,
        lng: 0,
      },
      {
        id: 'show2',
        date: nextWeek.toISOString().split('T')[0],
        venue: 'Another Venue',
        city: 'Another City',
        state: 'AS',
        lat: 0,
        lng: 0,
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockShows,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.shows.length).toBe(2)
    expect(result.current.status).toBe('success')
  })

  it('should create query with correct parameters', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: [],
    } as any)

    renderHook(() => useShows())

    expect(firebaseDatabase.ref).toHaveBeenCalledWith(mockDatabase, 'shows')
    expect(firebaseDatabase.query).toHaveBeenCalled()
  })

  it('should handle loading status', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'loading',
      data: null,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.status).toBe('loading')
    expect(result.current.shows).toEqual([])
  })

  it('should memoize shows data', () => {
    const mockShows = [
      {
        id: 'show1',
        date: '2024-12-25',
        venue: 'Test Venue',
        city: 'Test City',
        state: 'TS',
      },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockShows,
    } as any)

    const { result, rerender } = renderHook(() => useShows())
    const firstRender = result.current.shows

    rerender()
    const secondRender = result.current.shows

    expect(firstRender).toBe(secondRender)
  })
})
