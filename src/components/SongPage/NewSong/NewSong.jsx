import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { useSigninCheck } from "reactfire"
import styled from "styled-components"

import { NewSongForm } from "./NewSongForm"
import Button from "../../common/Button"

export const NewSong = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { status, data } = useSigninCheck()
  const toggleIsEditing = () => setIsEditing(!isEditing)

  if (status === "loading" || !data.signedIn) return null

  return (
    <Container>
      {isEditing ? (
        <NewSongForm toggleIsEditing={toggleIsEditing} />
      ) : (
        <Button
          onClick={() => {
            window.scrollTo(0, 0)
            toggleIsEditing()
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          Song
        </Button>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
