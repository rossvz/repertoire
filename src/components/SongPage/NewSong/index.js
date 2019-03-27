import { connect } from "react-redux";
import { toggleIsEditing } from "store/newSong/actions";
import NewSong from "./NewSong";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";

export default compose(
  firebaseConnect(),
  connect(
    ({ newSong, firebase: { auth } }) => ({
      isEditing: newSong.isEditing,
      auth
    }),
    {
      toggleIsEditing
    }
  )
)(NewSong);
