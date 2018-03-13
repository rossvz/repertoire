import { compose as composeHOC, mapProps } from 'recompose'
import { changeVote } from 'store/songs/actions'
import { connect } from 'react-redux'
import { compose, values, mapObjIndexed } from 'ramda'
import { firebaseConnect } from 'react-redux-firebase'
import ResetAllVotes from './ResetAllVotes'
import showIfAuthenticated from '../../../util/showIfAuthenticated'

const toArray = compose(values, mapObjIndexed((song, id) => ({ ...song, id })))

export default composeHOC(
  firebaseConnect(['songs']),
  connect(
    ({ firebase, songs }) => ({
      songs: toArray(firebase.data.songs)
    }),
    {
      changeVote
    }
  ),
  mapProps(({ changeVote, songs, ...otherProps }) => ({
    ...otherProps,
    resetAllVotes: () => songs.forEach(song => changeVote(song)('reset'))
  }))
)(showIfAuthenticated(ResetAllVotes))
