import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "")
  const ReactCompilerConfig = {
    target: "19",
  }

  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        },
      }),
    ],
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
  }
})
