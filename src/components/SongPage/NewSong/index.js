import { connect } from 'react-redux'
import { toggleIsEditing } from 'store/newSong/actions'
import NewSong from './NewSong'
import { firebaseConnect } from 'react-redux-firebase'

const wrappedNewSong = firebaseConnect([
  'auth'
])(NewSong)

export default connect(
  ({newSong, firebase}) => ({
    isEditing: newSong.isEditing,
    firebase
  }),
  {
    toggleIsEditing,
  }
)(wrappedNewSong)
