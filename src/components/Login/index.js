import { connect } from "react-redux";
import Login from "./Login";
import {
  emailChanged,
  passwordChanged,
  loginUser
} from "../../store/auth/actions";
import { withFirebase } from "react-redux-firebase";
import { compose } from "redux";

export default compose(
  withFirebase,
  connect(
    ({ firebase, auth }) => ({
      login: firebase.login,
      auth: firebase.auth,
      authentication: auth
    }),
    { emailChanged, passwordChanged, loginUser }
  )
)(Login);
