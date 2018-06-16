import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'

const Spotify = new SpotifyWebApi()
const setToken = async () => {
  const url = 'https://guarded-badlands-11018.herokuapp.com/authenticate?r=t'
  // const url = 'http://localhost:3002/authenticate?r=t'
  const results = await axios.get(url)
  Spotify.setAccessToken(results.data)
}
setToken()

export const searchSpotify = ({ title, artist }) => {
  let query = ''
  if (title && artist) query = `track:${title} artist:${artist}`
  else if (title) query = `track:${title}`
  return Spotify.searchTracks(query, { type: 'track' }).catch(err =>
    console.error(err)
  )
}

export const getArtistGenre = async artistId => {
  try {
    const results = await Spotify.getArtist(artistId)
    return results.genres || []
  } catch (e) {
    return []
  }
}
