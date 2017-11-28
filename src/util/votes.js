import { contains } from 'ramda'

export const isUpvoted = songId => contains(songId, readVotesFromStorage())

export const readVotesFromStorage = () => localStorage.getItem('persistedVotes') ? JSON.parse(localStorage.getItem('persistedVotes')) : []

export const toggleVoteInStorage = songId => {
  const isPreviousVote = isUpvoted(songId)
  if (isPreviousVote) removeVoteFromStorage(songId)
  else writeVoteToStorage(songId)
}

const writeVoteToStorage = songId => {
  const persistedVotes = [ ...readVotesFromStorage(), songId ]
  localStorage.setItem('persistedVotes', JSON.stringify(persistedVotes))
}

const removeVoteFromStorage = songId => {
  const persistedVotes = readVotesFromStorage().filter(persistedSongId => persistedSongId !== songId)
  localStorage.setItem('persistedVotes', JSON.stringify(persistedVotes))
}
