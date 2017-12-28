import { firebaseConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import Song from './Song'

const wrappedSong = firebaseConnect([
  'auth'
])(Song)

export default connect(
  ({firebase}) => ({
    firebase
  }),
  {}
)(wrappedSong)
