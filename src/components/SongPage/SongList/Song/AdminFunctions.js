import React from "react"
import styled from "styled-components"
import FontAwesome from "react-fontawesome"

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 7%;
  color: #fc1f49;
  opacity: 1;
  font-size: 1.2em;
  font-weight: bold;
`
const styles = {
  icon: {
    marginRight: "10px"
  },
  resetButton: {
    cursor: "pointer",
    marginBottom: "10px"
  }
}

export const AdminFunctions = ({
  song,
  changeVote,
  toggleVisible,
  deleteSong
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
    <div style={styles.resetButton} onClick={() => deleteSong()}>
      <div>
        <FontAwesome name={"trash"} style={styles.icon} />
      </div>
    </div>
  )
}

const ResetVotes = ({ resetVotes }) => (
  <div style={styles.resetButton} onClick={resetVotes}>
    <div>
      <FontAwesome name={"undo"} style={styles.icon} />
    </div>
  </div>
)

const Visibility = ({ visible = true, toggleVisible }) => (
  <div style={styles.visibilityButton} onClick={toggleVisible}>
    <FontAwesome name={visible ? "eye-slash" : "eye"} style={styles.icon} />
  </div>
)
