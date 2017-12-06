import { connect } from 'react-redux'
import Login from './Login'
import { emailChanged, passwordChanged, loginUser } from '../../store/auth/actions'
import { firebaseConnect } from 'react-redux-firebase'

const wrappedLogin = firebaseConnect([
  'auth'
])(Login)
export default connect(
  ({firebase, auth}) => ({
    auth: firebase.auth,
    authentication: auth
  }),
  {emailChanged, passwordChanged, loginUser}
)(wrappedLogin)

