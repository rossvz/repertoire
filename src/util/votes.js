import { includes } from "ramda"
import moment from "moment"

export const isUpvoted = songId => {
  const allIds = readVotesFromStorage().map(v => v.songId)
  return includes(songId, allIds)
}

const votesFromToday = vote =>
  moment(vote.date).isAfter(
    moment()
      .startOf("day")
      .unix()
  )

export const readVotesFromStorage = () => {
  const persistedVotes = localStorage.getItem("persistedVotes")
    ? JSON.parse(localStorage.getItem("persistedVotes"))
    : []
  return persistedVotes.filter(votesFromToday)
}

export const toggleVoteInStorage = songId => {
  if (isUpvoted(songId)) removeVoteFromStorage(songId)
  else writeVoteToStorage(songId)
}

const writeVoteToStorage = songId => {
  const persistedVotes = [
    ...readVotesFromStorage(),
    { songId, date: moment().unix() }
  ]
  localStorage.setItem("persistedVotes", JSON.stringify(persistedVotes))
}

export const removeVoteFromStorage = songId => {
  const persistedVotes = readVotesFromStorage().filter(
    vote => vote.songId !== songId
  )
  localStorage.setItem("persistedVotes", JSON.stringify(persistedVotes))
}
