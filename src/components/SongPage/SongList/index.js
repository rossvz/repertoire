import {
  mapObjIndexed,
  prop,
  reverse,
  sortBy,
  values,
} from 'ramda'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { changeVote } from 'store/songs/actions'
import { songContainsSearchTerm } from 'util/songs'
import SongList from './SongList'

const sortDescByVotes = compose(
  reverse,
  sortBy(prop('votes')),
  values,
  mapObjIndexed((song, id) => ({ ...song, id }))
)

export default compose(
  firebaseConnect([
    'songs'
  ]),
  connect(
    ({ firebase, newSong, songs }) => ({
      isEditing: newSong.isEditing,
      songs: sortDescByVotes(firebase.data.songs)
        .filter(songContainsSearchTerm(songs.filters.search)),
    }),
    {
      changeVote,
    }
  )
)(SongList)
