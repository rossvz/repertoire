import React, { useState } from "react"
import { NewSongForm } from "./NewSongForm"
import FontAwesome from "react-fontawesome"
import Button from "components/common/Button"

import { useSigninCheck } from "reactfire"
const styles = {
  container: {
    textAlign: "center"
  },
  icon: {
    marginRight: "10px"
  }
}

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
          Add Song
        </Button>
      )}
    </div>
  )
}
