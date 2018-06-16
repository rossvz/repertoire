import { toggleVoteInStorage, removeVoteFromStorage } from 'util/votes'
import {
  CHANGE_VOTE_FAIL,
  CHANGE_SONGS_FILTER,
  CHANGE_VISIBLE_FAIL
} from './constants'

export const changeVote = song => (
  dispatch,
  getState,
  getFirebase
) => async value => {
  const firebase = getFirebase()
  const votes = song.votes || 0
  let newVotes = votes + value
  if (value === 'reset' || newVotes < 0) newVotes = 0
  try {
    if (value === 'reset') removeVoteFromStorage(song.id)
    else toggleVoteInStorage(song.id)
    await firebase.update(`/songs/${song.id}`, { votes: newVotes })
  } catch (error) {
    toggleVoteInStorage(song.id)
    dispatch({
      type: CHANGE_VOTE_FAIL,
      error
    })
  }
}

export const removeSong = song => (
  dispatch,
  getState,
  getFirebase
) => async () => {
  try {
    const firebase = getFirebase()
    await firebase.remove(`/songs/${song.id}`)
  } catch (error) {
    console.log(error)
  }
}

export const changeSongsFilter = field => value => ({
  type: CHANGE_SONGS_FILTER,
  field,
  value
})

export const changeVisible = song => (
  dispatch,
  getState,
  getFirebase
) => async visible => {
  const firebase = getFirebase()
  try {
    await firebase.update(`/songs/${song.id}`, { visible })
  } catch (error) {
    dispatch({
      type: CHANGE_VISIBLE_FAIL,
      error
    })
  }
}
