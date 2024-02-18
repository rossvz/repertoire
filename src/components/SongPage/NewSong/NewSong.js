import React, { useState } from "react"
import FontAwesome from "react-fontawesome"
import { useSigninCheck } from "reactfire"

import { NewSongForm } from "./NewSongForm"
import Button from "../../common/Button"

export const NewSong = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { status, data } = useSigninCheck()
  const toggleIsEditing = () => setIsEditing(!isEditing)
  if (status === "loading" || !data.signedIn) return null
  return (
    <div style={styles.container}>
      {isEditing ? (
        <NewSongForm toggleIsEditing={toggleIsEditing} />
      ) : (
        <Button
          onClick={() => {
            window.scrollTo(0, 0)
            toggleIsEditing()
          }}
        >
          <FontAwesome style={styles.icon} name={"plus-circle"} />
          Song
        </Button>
      )}
    </div>
  )
}

const styles = {
  container: {
    textAlign: "center",
    // fontSize: "14px",
  },
  icon: {
    marginRight: "10px",
  },
}
