import axios from "axios"
import type { SpotifySearchParams } from "../types"

const SPOTIFY_API_URL = import.meta.env.VITE_SPOTIFY_API_URL

export const search = ({ title, artist }: SpotifySearchParams) => {
  let query = ""
  if (title && artist) query = `track:${title} artist:${artist}`
  else if (title) query = `track:${title}`
  return axios.get(`${SPOTIFY_API_URL}/search?q=${query}`)
}
