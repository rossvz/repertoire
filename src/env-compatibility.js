/**
 * This file provides compatibility between Create React App's environment variables
 * and Vite's environment variables during the migration period.
 *
 * CRA uses REACT_APP_ prefix, Vite uses VITE_ prefix
 */

// Support both Vite and Create React App environment variable formats
export const getEnvVariable = (reactAppKey) => {
  const viteKey = reactAppKey.replace("REACT_APP_", "VITE_")

  // If using Vite
  if (import.meta && import.meta.env) {
    return import.meta.env[viteKey] || process.env[reactAppKey]
  }

  // If using Create React App
  return process.env[reactAppKey]
}

// Export common environment variables for easy access
export const ENV = {
  GOOGLE_API_KEY: getEnvVariable("REACT_APP_GOOGLE_API_KEY"),
  GOOGLE_MAPS_API_KEY: getEnvVariable("REACT_APP_GOOGLE_MAPS_API_KEY"),
  SPOTIFY_API_URL: getEnvVariable("REACT_APP_SPOTIFY_API_URL"),
}
