import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useShows } from './useShows'
import * as reactfire from 'reactfire'

vi.mock('reactfire')

describe('useShows', () => {
  const mockDatabase = {}

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(reactfire.useDatabase).mockReturnValue(mockDatabase as any)
  })

  it('should return loading status when data is loading', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'loading',
      data: undefined,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.status).toBe('loading')
    expect(result.current.shows).toEqual([])
  })

  it('should return empty array when no shows', () => {
    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: [],
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.status).toBe('success')
    expect(result.current.shows).toEqual([])
  })

  it('should format and return shows from database', () => {
    const futureDate1 = new Date()
    futureDate1.setDate(futureDate1.getDate() + 5)
    const date1 = futureDate1.toISOString().split('T')[0]

    const futureDate2 = new Date()
    futureDate2.setDate(futureDate2.getDate() + 10)
    const date2 = futureDate2.toISOString().split('T')[0]

    const futureDate3 = new Date()
    futureDate3.setDate(futureDate3.getDate() + 15)
    const date3 = futureDate3.toISOString().split('T')[0]

    const mockShows = [
      { id: '1', date: date1, venue: 'Venue A', location: 'City A', time: '20:00' },
      { id: '2', date: date2, venue: 'Venue B', location: 'City B', time: '19:00' },
      { id: '3', date: date3, venue: 'Venue C', location: 'City C', time: '21:00' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockShows,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.shows.length).toBe(3)
    expect(result.current.shows[0]._date).toBeDefined()
    expect(result.current.shows[0]._location).toBeDefined()
  })

  it('should filter out past shows', () => {
    const pastDate = new Date('2020-01-01')
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 5)

    const mockShows = [
      { id: '1', date: pastDate.toISOString().split('T')[0], venue: 'Venue A', location: 'City A', time: '20:00' },
      { id: '2', date: futureDate.toISOString().split('T')[0], venue: 'Venue B', location: 'City B', time: '19:00' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockShows,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.shows.length).toBe(1)
    expect(result.current.shows[0].id).toBe('2')
  })

  it('should return success status when data is loaded', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)

    const mockShows = [
      { id: '1', date: futureDate.toISOString().split('T')[0], venue: 'Venue A', location: 'City A', time: '20:00' },
    ]

    vi.mocked(reactfire.useDatabaseListData).mockReturnValue({
      status: 'success',
      data: mockShows,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.status).toBe('success')
    expect(result.current.shows.length).toBe(1)
  })

  it('should memoize shows data', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)

    const mockShows = [
      { id: '1', date: futureDate.toISOString().split('T')[0], venue: 'Venue A', location: 'City A', time: '20:00' },
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
