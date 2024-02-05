import React from "react"
import styled from "styled-components"
import FontAwesome from "react-fontawesome"

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 5%;
  color: #fc1f49;
  opacity: 1;
  font-size: 1.2em;
  font-weight: bold;
  width: 100%;
`
const styles = {
  icon: {
    marginRight: "10px",
  },
  resetButton: {
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
      <FontAwesome
        style={styles.resetButton}
        name={"trash"}
        style={styles.icon}
      />
    </div>
  )
}

const ResetVotes = ({ resetVotes }) => (
  <div onClick={resetVotes}>
    <FontAwesome style={styles.resetButton} name={"undo"} style={styles.icon} />
  </div>
)

const Visibility = ({ visible = true, toggleVisible }) => (
  <div onClick={toggleVisible}>
    <FontAwesome
      style={styles.resetButton}
      name={visible ? "eye-slash" : "eye"}
      style={styles.icon}
    />
  </div>
)
