import React from "react"

import { useFirebaseApp, DatabaseProvider } from "reactfire"
import { getDatabase } from "firebase/database"
import { SongList } from "./SongList/SongList"
import { Header } from "components/Header"

export const SongListPage = () => {
  const firebaseApp = useFirebaseApp()
  const database = getDatabase(firebaseApp)

  return (
    <DatabaseProvider sdk={database}>
      <Header title={"Songs"} />
      {/*<HelperText />
      <NewSong />
      <ResetAllVotes /> */}
      <SongList />
    </DatabaseProvider>
  )
}
