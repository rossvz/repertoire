import React from "react"
import FontAwesome from "react-fontawesome"
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
      <FontAwesome name={"trash"} style={styles.icon} />
    </div>
  )
}

const ResetVotes = ({ resetVotes }) => (
  <div onClick={resetVotes} style={styles.clickable}>
    <FontAwesome name={"undo"} style={styles.icon} />
  </div>
)

const Visibility = ({ visible = true, toggleVisible }) => (
  <div onClick={toggleVisible} style={styles.clickable}>
    <FontAwesome name={visible ? "eye-slash" : "eye"} style={styles.icon} />
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
