import React from "react"
import { useSigninCheck } from "reactfire"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUndo } from "@fortawesome/free-solid-svg-icons"

import Button from "../common/Button"
import { useSongs } from "../SongPage/SongList/useSongs"
import { useResetAllVotes } from "./useResetAllVotes"

export const ResetAllVotes = () => {
  const { songs } = useSongs()
  const { data: user } = useSigninCheck()

  const resetAllVotes = useResetAllVotes()
  if (!user || !user.signedIn) {
    return null
  }
  return (
    <div style={styles.container}>
      <Button onClick={() => resetAllVotes(songs)}>
        <FontAwesomeIcon style={styles.icon} icon={faUndo} />
        Votes
      </Button>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    // fontSize: "14px",
  },
  icon: {
    marginRight: "10px",
  },
}
export default ResetAllVotes
