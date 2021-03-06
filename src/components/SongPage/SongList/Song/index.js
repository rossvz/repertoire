import { withFirebase } from "react-redux-firebase"
import { connect } from "react-redux"
import Song from "./Song"
import { compose } from "redux"
import { withHandlers } from "recompose"
import { toggleVisible, changeVote } from "../../../../store/songs/actions"

const mapStateToProps = ({ firebase }) => ({
  auth: firebase.auth
})

export default compose(
  withFirebase,
  withHandlers({
    changeVote,
    toggleVisible
  }),
  connect(
    mapStateToProps,
    {}
  )
)(Song)
