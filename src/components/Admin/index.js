import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Admin from './Admin'

const wrappedAdmin = firebaseConnect([
  'auth'
])(Admin)

export default connect(
  ({firebase, auth}) => ({
    auth: firebase.auth,
    authentication: auth
  }),
  {}
)(wrappedAdmin)

