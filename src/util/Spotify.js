import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'

const Spotify = new SpotifyWebApi()
const setToken = async () => {
  const url = 'https://guarded-badlands-11018.herokuapp.com/'
  const results = await axios.get(url)
  Spotify.setAccessToken(results.data)

}
setToken()

export const searchSpotify = ({title, artist}) => {
  let query = ''
  if (title && artist) query = `track:${title} artist:${artist}`
  else if (title) query = `track:${title}`
  return Spotify.searchTracks(query, {type: 'track'})
    .catch(err => console.error(err))
}
