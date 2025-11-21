export interface Song {
  id: string
  title: string
  artist: string
  album: string
  votes: number
  visible: boolean
  albumArtwork?: string
  artistId?: string
  releaseDate?: string
}

export interface Show {
  id: string
  date: string
  venue: string
  time?: string
  latLng?: {
    lat: number
    lng: number
  }
  _date?: string
  _location?: string
}

export interface Vote {
  songId: string
  date: number
}

export interface SpotifySearchParams {
  title?: string
  artist?: string
}
