import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTrash,
  faUndo,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { min } from "ramda"

export const AdminFunctions = ({
  song,
  changeVote,
  toggleVisible,
  deleteSong,
}) => {
  return (
    <Container>
      <Visibility visible={song.visible} toggleVisible={toggleVisible} />
      <ResetVotes resetVotes={() => changeVote("reset")} />
      <DeleteSong deleteSong={deleteSong} />
    </Container>
  )
}

export const DeleteSong = ({ deleteSong }) => {
  return (
    <div onClick={deleteSong} style={styles.clickable}>
      <FontAwesomeIcon icon={faTrash} style={styles.icon} />
    </div>
  )
}

const ResetVotes = ({ resetVotes }) => (
  <div onClick={resetVotes} style={styles.clickable}>
    <FontAwesomeIcon icon={faUndo} style={styles.icon} />
  </div>
)

const Visibility = ({ visible = true, toggleVisible }) => (
  <div onClick={toggleVisible} style={styles.clickable}>
    <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} style={styles.icon} />
  </div>
)

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  color: #fc1f49;
  opacity: 1;
  font-size: 1em;
  font-weight: bold;
`
const styles = {
  clickable: {
    cursor: "pointer",
    borderRadius: "5%",
    flex: 1,
    background: "",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "30px",
    marginTop: "5px",
  },
}
