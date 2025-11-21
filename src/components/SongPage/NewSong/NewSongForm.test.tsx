import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewSongForm } from './NewSongForm'
import * as Spotify from '../../../util/Spotify'

vi.mock('../../../util/Spotify', () => ({
  search: vi.fn(),
}))

vi.mock('firebase/database', () => ({
  ref: vi.fn(),
  push: vi.fn(() => ({ key: 'test-key' })),
  set: vi.fn(() => Promise.resolve()),
}))

describe('NewSongForm', () => {
  const mockToggleIsEditing = vi.fn()

  const mockSearchResults = {
    data: {
      items: [
        {
          id: 'track1',
          name: 'Test Song',
          artists: [{ name: 'Test Artist', id: 'artist1' }],
          album: {
            name: 'Test Album',
            release_date: '2024-01-15',
            images: [{ url: 'https://example.com/image.jpg' }],
          },
        },
        {
          id: 'track2',
          name: 'Another Song',
          artists: [{ name: 'Another Artist', id: 'artist2' }],
          album: {
            name: 'Another Album',
            release_date: '2023-06-20',
            images: [{ url: 'https://example.com/image2.jpg' }],
          },
        },
      ],
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders search form', () => {
    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    expect(screen.getByPlaceholderText('Title')).toBeTruthy()
    expect(screen.getByPlaceholderText('Artist (optional)')).toBeTruthy()
    expect(screen.getByRole('button', { name: /search/i })).toBeTruthy()
  })

  it('closes modal when close button is clicked', () => {
    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const closeButton = screen.getAllByRole('button')[0]
    fireEvent.click(closeButton)

    expect(mockToggleIsEditing).toHaveBeenCalled()
  })

  it('updates title input on change', async () => {
    const user = userEvent.setup()
    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement
    await user.type(titleInput, 'Test Song')

    expect(titleInput.value).toBe('Test Song')
  })

  it('updates artist input on change', async () => {
    const user = userEvent.setup()
    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const artistInput = screen.getByPlaceholderText('Artist (optional)') as HTMLInputElement
    await user.type(artistInput, 'Test Artist')

    expect(artistInput.value).toBe('Test Artist')
  })

  it('performs search when form is submitted', async () => {
    const user = userEvent.setup()
    vi.mocked(Spotify.search).mockResolvedValue(mockSearchResults as any)

    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await user.type(titleInput, 'Test Song')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    await waitFor(() => {
      expect(Spotify.search).toHaveBeenCalledWith({
        title: 'Test Song',
        artist: '',
      })
    })
  })

  it('displays search results after successful search', async () => {
    const user = userEvent.setup()
    vi.mocked(Spotify.search).mockResolvedValue(mockSearchResults as any)

    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await user.type(titleInput, 'Test Song')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeTruthy()
      expect(screen.getByText('Another Song')).toBeTruthy()
      expect(screen.getByText('2 results found')).toBeTruthy()
    })
  })

  it('shows searching indicator during search', async () => {
    const user = userEvent.setup()
    let resolveSearch: any
    const searchPromise = new Promise((resolve) => {
      resolveSearch = resolve
    })
    vi.mocked(Spotify.search).mockReturnValue(searchPromise as any)

    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await user.type(titleInput, 'Test Song')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    expect(screen.getAllByText(/Searching.../i).length).toBeGreaterThan(0)

    resolveSearch(mockSearchResults)

    await waitFor(() => {
      expect(screen.queryAllByText(/Searching.../i).length).toBe(0)
    })
  })

  it('clears search when clear button is clicked', async () => {
    const user = userEvent.setup()
    vi.mocked(Spotify.search).mockResolvedValue(mockSearchResults as any)

    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title') as HTMLInputElement
    await user.type(titleInput, 'Test Song')

    const clearButton = screen.getByRole('button', { name: /clear/i })
    await user.click(clearButton)

    expect(titleInput.value).toBe('')
  })

  it('saves song when select button is clicked', async () => {
    const user = userEvent.setup()
    const { push, set } = await import('firebase/database')
    vi.mocked(Spotify.search).mockResolvedValue(mockSearchResults as any)

    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await user.type(titleInput, 'Test Song')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeTruthy()
    })

    const selectButtons = screen.getAllByRole('button', { name: /select/i })
    await user.click(selectButtons[0])

    expect(push).toHaveBeenCalled()
    expect(set).toHaveBeenCalled()
    expect(mockToggleIsEditing).toHaveBeenCalled()
  })

  it('displays no results message when search returns empty results', async () => {
    const user = userEvent.setup()
    vi.mocked(Spotify.search).mockResolvedValue({ data: { items: [] } } as any)

    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await user.type(titleInput, 'NonexistentSong')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    await waitFor(() => {
      expect(screen.getByText(/No results found/i)).toBeTruthy()
    })
  })

  it('disables search button while searching', async () => {
    const user = userEvent.setup()
    let resolveSearch: any
    const searchPromise = new Promise((resolve) => {
      resolveSearch = resolve
    })
    vi.mocked(Spotify.search).mockReturnValue(searchPromise as any)

    render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await user.type(titleInput, 'Test Song')

    const searchButton = screen.getByRole('button', { name: /search/i }) as HTMLButtonElement
    await user.click(searchButton)

    expect(searchButton.disabled).toBe(true)

    resolveSearch(mockSearchResults)

    await waitFor(() => {
      expect(searchButton.disabled).toBe(false)
    })
  })

  it('renders album artwork when available', async () => {
    const user = userEvent.setup()
    vi.mocked(Spotify.search).mockResolvedValue(mockSearchResults as any)

    const { container } = render(<NewSongForm toggleIsEditing={mockToggleIsEditing} />)

    const titleInput = screen.getByPlaceholderText('Title')
    await user.type(titleInput, 'Test Song')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    await waitFor(() => {
      const albumImage = container.querySelector('img[alt="Test Album"]') as HTMLImageElement
      expect(albumImage).toBeTruthy()
      expect(albumImage.src).toBe('https://example.com/image.jpg')
    })
  })
})
