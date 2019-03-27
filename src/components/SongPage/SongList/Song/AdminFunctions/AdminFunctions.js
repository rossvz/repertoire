import React from "react";
import Visibility from "./Visibility";
import ResetVotes from "./ResetVotes";
import DeleteSong from "./DeleteSong";
import styled from "styled-components";

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
`;

const AdminFunctions = ({ song, changeVote, toggleVisible, removeSong }) => {
  return (
    <Container>
      <Visibility visible={song.visible} toggleVisible={toggleVisible} />
      <ResetVotes resetVotes={() => changeVote("reset")} />
      <DeleteSong removeSong={removeSong} />
    </Container>
  );
};

export default AdminFunctions;
