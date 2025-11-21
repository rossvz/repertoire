import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
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
      target: "esnext",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: ["./src/test-setup.ts"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
      },
    },
  }
})
