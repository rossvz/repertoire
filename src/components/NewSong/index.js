import { connect } from 'react-redux'
import { toggleIsEditing } from 'store/newSong/actions'
import NewSong from './NewSong'

export default connect(
  ({ newSong }) => ({
    isEditing: newSong.isEditing,
  }),
  {
    toggleIsEditing,
  }
)(NewSong)
