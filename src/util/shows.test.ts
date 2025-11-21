import { describe, it, expect } from 'vitest'
import { sortByDate, formatShows } from './shows'
import type { Show } from '../types'

describe('shows', () => {
  describe('sortByDate', () => {
    it('sorts shows by date in ascending order', () => {
      const shows: Show[] = [
        { id: '1', date: '2025-12-01', venue: 'Venue A', time: '8pm' },
        { id: '2', date: '2025-11-15', venue: 'Venue B', time: '9pm' },
        { id: '3', date: '2025-12-31', venue: 'Venue C', time: '7pm' },
      ]

      const sorted = sortByDate(shows)

      expect(sorted[0].id).toBe('2')
      expect(sorted[1].id).toBe('1')
      expect(sorted[2].id).toBe('3')
    })

    it('handles empty array', () => {
      expect(sortByDate([])).toEqual([])
    })

    it('handles single show', () => {
      const show: Show = { id: '1', date: '2025-12-01', venue: 'Venue A', time: '8pm' }
      expect(sortByDate([show])).toEqual([show])
    })

    it('handles shows with same date', () => {
      const shows: Show[] = [
        { id: '1', date: '2025-12-01', venue: 'Venue A', time: '8pm' },
        { id: '2', date: '2025-12-01', venue: 'Venue B', time: '9pm' },
      ]

      const sorted = sortByDate(shows)
      expect(sorted).toHaveLength(2)
    })
  })

  describe('formatShows', () => {
    it('adds formatted date to shows', () => {
      const shows: Show[] = [
        { id: '1', date: '2025-12-25', venue: 'Venue A', time: '8pm' },
      ]

      const formatted = formatShows(shows)

      expect(formatted[0]._date).toBeDefined()
      expect(formatted[0]._date).toContain('December')
    })

    it('adds google maps location without latLng', () => {
      const shows: Show[] = [
        { id: '1', date: '2025-12-25', venue: 'Test Venue', time: '8pm' },
      ]

      const formatted = formatShows(shows)

      expect(formatted[0]._location).toBe(
        'https://www.google.com/maps/search/?api=1&query=Test Venue'
      )
    })

    it('adds google maps directions with latLng', () => {
      const shows: Show[] = [
        {
          id: '1',
          date: '2025-12-25',
          venue: 'Test Venue',
          time: '8pm',
          latLng: { lat: 40.7128, lng: -74.006 },
        },
      ]

      const formatted = formatShows(shows)

      expect(formatted[0]._location).toBe(
        'https://www.google.com/maps/dir/?api=1&destination=40.7128,-74.006'
      )
    })

    it('filters out past shows', () => {
      const shows: Show[] = [
        { id: '1', date: '2020-01-01', venue: 'Past Venue', time: '8pm' },
        { id: '2', date: '2025-12-25', venue: 'Future Venue', time: '8pm' },
      ]

      const formatted = formatShows(shows)

      expect(formatted).toHaveLength(1)
      expect(formatted[0].id).toBe('2')
    })

    it('includes shows from today', () => {
      const today = new Date().toISOString().split('T')[0]
      const shows: Show[] = [
        { id: '1', date: today, venue: 'Today Venue', time: '8pm' },
      ]

      const formatted = formatShows(shows)

      expect(formatted).toHaveLength(1)
    })

    it('handles empty array', () => {
      expect(formatShows([])).toEqual([])
    })

    it('processes all transformations in correct order', () => {
      const shows: Show[] = [
        {
          id: '1',
          date: '2025-12-25',
          venue: 'Test Venue',
          time: '8pm',
          latLng: { lat: 40.7128, lng: -74.006 },
        },
      ]

      const formatted = formatShows(shows)

      expect(formatted).toHaveLength(1)
      expect(formatted[0]._date).toBeDefined()
      expect(formatted[0]._location).toBeDefined()
      expect(formatted[0]._location).toContain('destination')
    })
  })
})
