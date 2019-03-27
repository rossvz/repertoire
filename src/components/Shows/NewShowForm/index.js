import { connect } from "react-redux";
import NewShowForm from "./NewShowForm";
import { toggleEditingNewShow } from "store/shows/actions";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

const connectStateToProps = ({ shows }) => ({
  editingNewShow: shows.editingNewShow
});

export default compose(
  firebaseConnect(["auth"]),
  connect(
    connectStateToProps,
    { toggleEditingNewShow }
  )
)(NewShowForm);
