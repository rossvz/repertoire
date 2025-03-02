import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "")

  // Create a process.env-like object with all environment variables
  const processEnv = {}

  // Add all environment variables to processEnv
  for (const key in env) {
    processEnv[key] = env[key]
  }

  // Ensure REACT_APP_ variables are available
  processEnv.REACT_APP_GOOGLE_API_KEY = env.REACT_APP_GOOGLE_API_KEY || ""
  processEnv.REACT_APP_GOOGLE_MAPS_API_KEY =
    env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
  processEnv.REACT_APP_SPOTIFY_API_URL = env.REACT_APP_SPOTIFY_API_URL || ""

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: "build",
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    // Pass environment variables to the app
    define: {
      "process.env": processEnv,
    },
  }
})
