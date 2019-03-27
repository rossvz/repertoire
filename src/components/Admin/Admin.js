import React from "react";
import Header from "components/Header/Header";
import LogoutButton from "components/Login/LogoutButton";
import NewShowForm from "components/Shows/NewShowForm";
import NewSong from "components/SongPage/NewSong";
import ResetAllVotes from "components/SongPage/ResetAllVotes";
import styled from "styled-components";

const Heading = styled.h2`
  color: white;
  text-align: center;
`;

const Admin = ({ firebase }) => {
  return (
    <div>
      <Header title={"Settings"} />
      <div>
        <Heading>Shows</Heading>
        <NewShowForm />
        <br />
        <Heading>Songs</Heading>
        <NewSong />
        <ResetAllVotes />
      </div>
      <LogoutButton />
    </div>
  );
};

export default Admin;
