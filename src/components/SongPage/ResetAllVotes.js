import React from "react"
import Button from "components/common/Button"
import { useSongs } from "./SongList/useSongs"
import { useResetAllVotes } from "./ResetAllVotes/useResetAllVotes"
import { useSigninCheck } from "reactfire"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center"
  }
}

export const ResetAllVotes = () => {
  const { songs } = useSongs()
  const { data: user } = useSigninCheck()

  const resetAllVotes = useResetAllVotes()
  if (!user || !user.signedIn) {
    return null
  }
  return (
    <div style={styles.container}>
      <Button onClick={() => resetAllVotes(songs)}>Reset All Votes</Button>
    </div>
  )
}

export default ResetAllVotes
