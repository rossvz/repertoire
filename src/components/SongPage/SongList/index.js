import { mapObjIndexed, prop, reverse, sortBy, values } from "ramda";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { songContainsSearchTerm } from "util/songs";
import SongList from "./SongList";

const sortByVisible = array =>
  array.sort(function(a, b) {
    return a.visible - b.visible;
  });

const sortDescByVotes = compose(
  reverse,
  sortByVisible,
  sortBy(prop("votes")),
  values,
  mapObjIndexed((song, id) => ({ ...song, id }))
);

const mapStateToProps = ({ firebase, newSong, songs }) => ({
  isEditing: newSong.isEditing,
  songs: sortDescByVotes(firebase.data.songs).filter(
    songContainsSearchTerm(songs.filters.search)
  )
});
export default compose(
  firebaseConnect(["songs"]),
  connect(
    mapStateToProps,
    {}
  )
)(SongList);
