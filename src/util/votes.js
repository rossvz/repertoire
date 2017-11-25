export const readVotesFromStorage = () => localStorage.getItem('persistedVotes') ? JSON.parse(localStorage.getItem('persistedVotes')) : []

export const writeVoteToStorage = songId => {
  const persistedVotes = JSON.stringify([ ...readVotesFromStorage(), songId ])
  localStorage.setItem('persistedVotes', persistedVotes)
}
