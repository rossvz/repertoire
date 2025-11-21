import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useShows } from './useShows'
import type { Show } from '../../types'
import * as reactfire from 'reactfire'

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  query: vi.fn(),
  orderByChild: vi.fn(),
  startAfter: vi.fn(),
  limitToLast: vi.fn(),
}))

describe('useShows', () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  const nextMonth = new Date()
  nextMonth.setDate(nextMonth.getDate() + 30)

  const mockShows: Show[] = [
    {
      id: '1',
      date: tomorrow.toISOString().split('T')[0],
      venue: 'Venue A',
      city: 'New York',
      state: 'NY',
    },
    {
      id: '2',
      date: nextWeek.toISOString().split('T')[0],
      venue: 'Venue B',
      city: 'Los Angeles',
      state: 'CA',
    },
    {
      id: '3',
      date: nextMonth.toISOString().split('T')[0],
      venue: 'Venue C',
      city: 'Chicago',
      state: 'IL',
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

    const { result } = renderHook(() => useShows())

    expect(result.current.shows).toEqual([])
    expect(result.current.status).toBe('loading')
  })

  it('returns formatted shows when data is loaded', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockShows,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.status).toBe('success')
    expect(result.current.shows).toHaveLength(3)
  })

  it('returns shows in chronological order (future shows)', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockShows,
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.shows).toHaveLength(3)
    expect(result.current.shows[0].id).toBe('1')
    expect(result.current.shows[1].id).toBe('2')
    expect(result.current.shows[2].id).toBe('3')
  })

  it('memoizes shows based on data', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: mockShows,
    } as any)

    const { result, rerender } = renderHook(() => useShows())

    const firstResult = result.current.shows

    rerender()

    expect(result.current.shows).toBe(firstResult)
  })

  it('handles empty shows data', () => {
    vi.spyOn(reactfire, 'useDatabaseListData').mockReturnValue({
      status: 'success',
      data: [],
    } as any)

    const { result } = renderHook(() => useShows())

    expect(result.current.shows).toEqual([])
    expect(result.current.status).toBe('success')
  })
})
