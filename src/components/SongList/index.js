import {
  mapObjIndexed,
  prop,
  reverse,
  sortBy,
} from 'ramda'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import SongList from './SongList';

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
    {},
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
      changeVote: song => value => {
        const votes = song.votes || 0
        const newVotes = votes + value
        ownProps.firebase.update(`/songs/${song.id}`, { votes: newVotes })
      },
    })
  )
)(SongList)
