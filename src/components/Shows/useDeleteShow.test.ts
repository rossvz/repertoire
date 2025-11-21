import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDeleteShow } from './useDeleteShow'
import * as reactfire from 'reactfire'
import * as firebaseDatabase from 'firebase/database'

vi.mock('reactfire')
vi.mock('firebase/database')

describe('useDeleteShow', () => {
  const mockDatabase = {}
  const mockShow = {
    id: 'show-123',
    date: '2024-03-15',
    venue: 'Test Venue',
    location: 'Test City',
    time: '20:00',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(reactfire.useDatabase).mockReturnValue(mockDatabase as any)
  })

  it('should call remove with correct show reference', () => {
    const mockRef = { path: 'shows/show-123' }
    const mockRemove = vi.fn()

    vi.mocked(firebaseDatabase.ref).mockReturnValue(mockRef as any)
    vi.mocked(firebaseDatabase.remove).mockImplementation(mockRemove)

    const { result } = renderHook(() => useDeleteShow(mockShow))

    act(() => {
      result.current()
    })

    expect(firebaseDatabase.ref).toHaveBeenCalledWith(mockDatabase, 'shows/show-123')
    expect(mockRemove).toHaveBeenCalledWith(mockRef)
  })

  it('should return a memoized callback', () => {
    const mockRef = { path: 'shows/show-123' }
    vi.mocked(firebaseDatabase.ref).mockReturnValue(mockRef as any)

    const { result, rerender } = renderHook(() => useDeleteShow(mockShow))

    const firstCallback = result.current
    rerender()
    const secondCallback = result.current

    expect(firstCallback).toBe(secondCallback)
  })

  it('should update callback when show changes', () => {
    const mockRef1 = { path: 'shows/show-123' }
    const mockRef2 = { path: 'shows/show-456' }

    vi.mocked(firebaseDatabase.ref)
      .mockReturnValueOnce(mockRef1 as any)
      .mockReturnValueOnce(mockRef2 as any)

    const { result, rerender } = renderHook(
      ({ show }) => useDeleteShow(show),
      { initialProps: { show: mockShow } }
    )

    const firstCallback = result.current

    const newShow = { ...mockShow, id: 'show-456' }
    rerender({ show: newShow })
    const secondCallback = result.current

    expect(firstCallback).not.toBe(secondCallback)
  })

  it('should handle delete for different show IDs', () => {
    const mockRemove = vi.fn()
    vi.mocked(firebaseDatabase.remove).mockImplementation(mockRemove)

    const show1 = { ...mockShow, id: 'show-1' }
    const show2 = { ...mockShow, id: 'show-2' }

    vi.mocked(firebaseDatabase.ref).mockReturnValue({} as any)

    const { result: result1 } = renderHook(() => useDeleteShow(show1))
    const { result: result2 } = renderHook(() => useDeleteShow(show2))

    expect(firebaseDatabase.ref).toHaveBeenCalledWith(mockDatabase, 'shows/show-1')
    expect(firebaseDatabase.ref).toHaveBeenCalledWith(mockDatabase, 'shows/show-2')
  })
})
