import { toggleVoteInStorage } from 'util/votes'
import { CHANGE_VOTE_FAIL, CHANGE_SONGS_FILTER } from './constants'

export const changeVote = song => (dispatch, getState, getFirebase) =>
  async value => {
    const firebase = getFirebase()
    const votes = song.votes || 0
    const newVotes = votes + value
    try {
      toggleVoteInStorage(song.id)
      await firebase.update(`/songs/${song.id}`, { votes: newVotes })
    } catch (error) {
      toggleVoteInStorage(song.id)
      dispatch({
        type: CHANGE_VOTE_FAIL,
        error,
      })
    }
  }

export const changeSongsFilter = field => value => ({
  type: CHANGE_SONGS_FILTER,
  field,
  value,
})
