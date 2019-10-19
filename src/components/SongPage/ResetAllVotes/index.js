import { compose as composeHOC, mapProps, withHandlers } from "recompose"
import { changeVote } from "store/songs/actions"
import { connect } from "react-redux"
import { compose, values, mapObjIndexed } from "ramda"
import { withFirebase } from "react-redux-firebase"
import ResetAllVotes from "./ResetAllVotes"
import showIfAuthenticated from "../../../util/showIfAuthenticated"
import { removeVoteFromStorage } from "../../../util/votes"

const toArray = compose(
  values,
  mapObjIndexed((song, id) => ({ ...song, id }))
)

export default composeHOC(
  withFirebase,
  withHandlers({
    changeVote
  }),

  connect(
    ({ firebase, songs }) => ({
      songs: toArray(firebase.data.songs)
    }),
    {}
  ),
  mapProps(({ changeVote, songs, firebase, ...otherProps }) => {
    return {
      ...otherProps,
      resetAllVotes: () => {
        return songs.forEach(song => {
          removeVoteFromStorage(song.id)
          return firebase.update(`/songs/${song.id}`, { votes: 0 })
        })
      }
    }
  })
)(showIfAuthenticated(ResetAllVotes))
