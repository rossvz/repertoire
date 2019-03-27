import { CHANGE_SONGS_FILTER, CHANGE_VISIBLE_FAIL } from "./constants";
import { toggleVoteInStorage } from "../../util/votes";

export const changeSongsFilter = field => value => ({
  type: CHANGE_SONGS_FILTER,
  field,
  value
});

export const changeVisible = song => (
  dispatch,
  getState,
  getFirebase
) => async visible => {
  const firebase = getFirebase();
  try {
    await firebase.update(`/songs/${song.id}`, { visible });
  } catch (error) {
    dispatch({
      type: CHANGE_VISIBLE_FAIL,
      error
    });
  }
};

export const changeVote = props => value => {
  const votes =
    props.song.votes < 0 || value === "reset" ? 0 : props.song.votes + value;
  props.firebase.update(`/songs/${props.song.id}`, { votes });
  toggleVoteInStorage(props.song.id);
};
export const toggleVisible = ({ firebase, song }) => _event =>
  firebase.update(`/songs/${song.id}`, { visible: !song.visible });
