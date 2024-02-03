import React, { useState } from "react"
import { NewSongForm } from "./NewSongForm"
import FontAwesome from "react-fontawesome"
import Button from "components/common/Button"

const styles = {
  container: {
    marginTop: 20,
    textAlign: "center"
  },
  icon: {
    marginRight: "10px"
  }
}

export const NewSong = () => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleIsEditing = () => setIsEditing(!isEditing)
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
          ADD SONG
        </Button>
      )}
    </div>
  )
}
