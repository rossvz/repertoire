/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_API_KEY: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  readonly VITE_SPOTIFY_API_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
