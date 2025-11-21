import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDeleteShow } from './useDeleteShow'
import * as reactfire from 'reactfire'
import * as firebaseDatabase from 'firebase/database'
import type { Show } from '../../types'

vi.mock('reactfire')
vi.mock('firebase/database')

describe('useDeleteShow', () => {
  const mockDatabase = {}
  const mockShowRef = {}
  const mockShow: Show = {
    id: 'show123',
    date: '2024-12-25',
    venue: 'Test Venue',
    city: 'Test City',
    state: 'TS',
    lat: 0,
    lng: 0,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(reactfire.useDatabase).mockReturnValue(mockDatabase as any)
    vi.mocked(firebaseDatabase.ref).mockReturnValue(mockShowRef as any)
    vi.mocked(firebaseDatabase.remove).mockResolvedValue(undefined)
  })

  it('should create ref with correct path', () => {
    renderHook(() => useDeleteShow(mockShow))

    expect(firebaseDatabase.ref).toHaveBeenCalledWith(mockDatabase, 'shows/show123')
  })

  it('should return a callback function', () => {
    const { result } = renderHook(() => useDeleteShow(mockShow))

    expect(typeof result.current).toBe('function')
  })

  it('should call remove when callback is invoked', () => {
    const { result } = renderHook(() => useDeleteShow(mockShow))

    act(() => {
      result.current()
    })

    expect(firebaseDatabase.remove).toHaveBeenCalledWith(mockShowRef)
  })

  it('should memoize callback with same showRef', () => {
    const { result, rerender } = renderHook(() => useDeleteShow(mockShow))
    const firstCallback = result.current

    rerender()
    const secondCallback = result.current

    expect(firstCallback).toBe(secondCallback)
  })

  it('should handle different show ids', () => {
    const show1: Show = { ...mockShow, id: 'show1' }
    const show2: Show = { ...mockShow, id: 'show2' }

    const { result: result1 } = renderHook(() => useDeleteShow(show1))
    const { result: result2 } = renderHook(() => useDeleteShow(show2))

    act(() => {
      result1.current()
      result2.current()
    })

    expect(firebaseDatabase.ref).toHaveBeenCalledWith(mockDatabase, 'shows/show1')
    expect(firebaseDatabase.ref).toHaveBeenCalledWith(mockDatabase, 'shows/show2')
    expect(firebaseDatabase.remove).toHaveBeenCalledTimes(2)
  })
})
