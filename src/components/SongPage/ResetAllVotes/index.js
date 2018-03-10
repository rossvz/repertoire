import React from "react"
import {resetAllVotes} from 'store/songs/actions'
import {connect} from 'react-redux'
import {compose, values, mapObjIndexed} from 'ramda'
import {firebaseConnect} from 'react-redux-firebase'

const ResetAllVotes = ({resetAllVotes,songs}) => {
  return (
  <button onClick={()=>{resetAllVotes(songs)('reset')}}>
  Reset All Votes
  </button>
)}

const toArray = compose(
  values,
  mapObjIndexed((song, id) => ({ ...song, id }))
)

export default compose(
  firebaseConnect([
    'songs'
  ]),
  connect(
    ({ firebase, songs }) => ({
      songs: toArray(firebase.data.songs)
    }),
    {
      resetAllVotes
    }
  )
)(ResetAllVotes)