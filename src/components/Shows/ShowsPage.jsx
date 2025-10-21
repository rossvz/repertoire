import { useFirebaseApp, DatabaseProvider } from "reactfire"
import { getDatabase } from "firebase/database"
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"

import { Shows } from "./Shows"

setOptions({
  key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  libraries: ["places"],
})

await importLibrary("maps")
export const ShowsPage = () => {
  const firebaseApp = useFirebaseApp()
  const database = getDatabase(firebaseApp)

  return (
    <DatabaseProvider sdk={database}>
      <Shows />
    </DatabaseProvider>
  )
}
