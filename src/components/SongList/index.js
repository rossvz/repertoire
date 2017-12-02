import {
  mapObjIndexed,
  prop,
  reverse,
  sortBy,
} from 'ramda'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { changeVote } from 'store/songs/actions'
import SongList from './SongList'

const sortDescByVotes = compose(
  reverse,
  sortBy(prop('votes')),
  Object.values,
  mapObjIndexed((song, id) => ({ ...song, id }))
)

export default compose(
  firebaseConnect([
    'songs'
  ]),
  connect(
    ({ firebase }) => ({
      songs: sortDescByVotes(firebase.data.songs),
    }),
    {
      changeVote,
    }
  )
)(SongList)
