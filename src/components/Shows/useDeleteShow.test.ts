import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useDeleteShow } from './useDeleteShow'
import type { Show } from '../../types'
import * as firebaseDatabase from 'firebase/database'

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  remove: vi.fn(),
}))

describe('useDeleteShow', () => {
  const mockShow: Show = {
    id: '1',
    date: '2024-12-01',
    venue: 'Test Venue',
    city: 'New York',
    state: 'NY',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a delete function that removes the show from database', () => {
    const mockRemove = vi.fn()
    vi.spyOn(firebaseDatabase, 'remove').mockImplementation(mockRemove)
    vi.spyOn(firebaseDatabase, 'ref').mockReturnValue({ ref: 'shows/1' } as any)

    const { result } = renderHook(() => useDeleteShow(mockShow))

    result.current()

    expect(mockRemove).toHaveBeenCalledTimes(1)
  })

  it('creates a function that references the correct show path', () => {
    const mockRef = vi.fn()
    vi.spyOn(firebaseDatabase, 'ref').mockImplementation(mockRef)

    renderHook(() => useDeleteShow(mockShow))

    expect(mockRef).toHaveBeenCalledWith({}, 'shows/1')
  })

  it('returns a memoized callback', () => {
    const { result, rerender } = renderHook(() => useDeleteShow(mockShow))

    const firstCallback = result.current

    rerender()

    expect(result.current).toBe(firstCallback)
  })

  it('can be called multiple times', () => {
    const mockRemove = vi.fn()
    vi.spyOn(firebaseDatabase, 'remove').mockImplementation(mockRemove)
    vi.spyOn(firebaseDatabase, 'ref').mockReturnValue({ ref: 'shows/1' } as any)

    const { result } = renderHook(() => useDeleteShow(mockShow))

    result.current()
    result.current()
    result.current()

    expect(mockRemove).toHaveBeenCalledTimes(3)
  })
})
