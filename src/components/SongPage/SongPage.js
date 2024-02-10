import React from "react"
import { getDatabase } from "firebase/database"
import { useFirebaseApp, DatabaseProvider } from "reactfire"

import { SongList } from "./SongList/SongList"
import { Header } from "../Header"
import { HelperText } from "./HelperText"
import { NewSong } from "./NewSong/NewSong"
import { ResetAllVotes } from "../Admin/ResetAllVotes"

export const SongListPage = () => {
  const firebaseApp = useFirebaseApp()
  const database = getDatabase(firebaseApp)

  return (
    <DatabaseProvider sdk={database}>
      <Header title={"Songs"} left={<NewSong />} right={<ResetAllVotes />} />
      {/* <HelperText /> */}
      {/* <div style={styles.adminTopButtons}>
        <NewSong />
        <ResetAllVotes />
      </div> */}
      <SongList />
    </DatabaseProvider>
  )
}

const styles = {
  adminTopButtons: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
}
