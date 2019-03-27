import React from "react";
import Header from "../Header";
import Search from "./Search";
import NewSong from "./NewSong";
import SongList from "./SongList";
import HelperText from "./HelperText";
import ResetAllVotes from "./ResetAllVotes";

const styles = {
  songPage: {}
};
const SongPage = props => {
  return (
    <div style={styles.songPage}>
      <Header />
      <Search />
      <HelperText />
      <NewSong />
      <ResetAllVotes />
      <SongList />
    </div>
  );
};

export default SongPage;
