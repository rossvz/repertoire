import { writeVoteToStorage } from '../../util/votes'
import { CHANGE_VOTE_FAIL } from './constants'

export const changeVote = song => (dispatch, getState, getFirebase) =>
  async value => {
    const firebase = getFirebase()
    const votes = song.votes || 0
    const newVotes = votes + value
    try {
      writeVoteToStorage(song.id)
      await firebase.update(`/songs/${song.id}`, { votes: newVotes })
    } catch (error) {
      dispatch({
        type: CHANGE_VOTE_FAIL,
        error,
      })
    }
  }


