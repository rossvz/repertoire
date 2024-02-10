import React from "react"
import FontAwesome from "react-fontawesome"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  color: #fc1f49;
  opacity: 1;
  font-size: 1em;
  font-weight: bold;
  width: 25%;
`
const styles = {
  icon: {
    cursor: "pointer",
  },
}

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
    <div onClick={deleteSong}>
      <FontAwesome name={"trash"} style={styles.icon} />
    </div>
  )
}

const ResetVotes = ({ resetVotes }) => (
  <div onClick={resetVotes}>
    <FontAwesome name={"undo"} style={styles.icon} />
  </div>
)

const Visibility = ({ visible = true, toggleVisible }) => (
  <div onClick={toggleVisible}>
    <FontAwesome name={visible ? "eye-slash" : "eye"} style={styles.icon} />
  </div>
)
