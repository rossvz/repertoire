import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'build/',
        'src/index.tsx',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/',
      ],
      include: ['src/**/*.{ts,tsx}'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4,
      },
    },
    testTimeout: 5000,
    hookTimeout: 5000,
    teardownTimeout: 1000,
    isolate: true,
    passWithNoTests: false,
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'build', 'dist'],
  },
})
