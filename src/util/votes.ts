import { includes } from "ramda"
import moment from "moment"
import type { Vote } from "../types"

export const isUpvoted = (songId: string): boolean => {
  const allIds = readVotesFromStorage().map((v) => v.songId)
  return includes(songId, allIds)
}

const votesFromToday = (vote: Vote): boolean =>
  moment(vote.date).isAfter(moment().startOf("day").unix())

export const readVotesFromStorage = (): Vote[] => {
  const persistedVotes = localStorage.getItem("persistedVotes")
    ? JSON.parse(localStorage.getItem("persistedVotes")!)
    : []
  return persistedVotes.filter(votesFromToday)
}

export const toggleVoteInStorage = (songId: string): void => {
  if (isUpvoted(songId)) removeVoteFromStorage(songId)
  else writeVoteToStorage(songId)
}

const writeVoteToStorage = (songId: string): void => {
  const persistedVotes = [
    ...readVotesFromStorage(),
    { songId, date: moment().unix() },
  ]
  localStorage.setItem("persistedVotes", JSON.stringify(persistedVotes))
}

export const removeVoteFromStorage = (songId: string): void => {
  const persistedVotes = readVotesFromStorage().filter(
    (vote) => vote.songId !== songId,
  )
  localStorage.setItem("persistedVotes", JSON.stringify(persistedVotes))
}
