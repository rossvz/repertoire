import axios from "axios"

const SPOTIFY_API_URL = process.env.REACT_APP_SPOTIFY_API_URL

export const search = ({ title, artist }) => {
  let query = ""
  if (title && artist) query = `track:${title} artist:${artist}`
  else if (title) query = `track:${title}`
  return axios.get(`${SPOTIFY_API_URL}/search?q=${query}`)
}
