import React from "react"

import { useFirebaseApp, DatabaseProvider } from "reactfire"
import { getDatabase } from "firebase/database"

import { Shows } from "./Shows"

export const ShowsPage = () => {
  const firebaseApp = useFirebaseApp()
  const database = getDatabase(firebaseApp)

  return (
    <DatabaseProvider sdk={database}>
      <Shows />
    </DatabaseProvider>
  )
}
