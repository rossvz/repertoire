import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Visibility from './Visibility'

const wrappedVisibility = firebaseConnect([
  'auth'
])(Visibility)

export default connect(
  ({firebase}) => ({
    firebase
  }),
  {}
)(wrappedVisibility)
