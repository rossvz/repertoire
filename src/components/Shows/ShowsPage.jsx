import React from "react"

import { useFirebaseApp, DatabaseProvider } from "reactfire"
import { getDatabase } from "firebase/database"
import { Loader } from "@googlemaps/js-api-loader"

import { Shows } from "./Shows"

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places"],
})

export const ShowsPage = () => {
  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps")
  })
  const firebaseApp = useFirebaseApp()
  const database = getDatabase(firebaseApp)

  return (
    <DatabaseProvider sdk={database}>
      <Shows />
    </DatabaseProvider>
  )
}
