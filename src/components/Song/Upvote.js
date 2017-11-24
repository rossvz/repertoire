import { contains } from 'ramda'
import React from 'react'
import Arrow from '../../img/arrow-up.svg'

const readVotesFromStorage = () => localStorage.getItem('persistedVotes') ? JSON.parse(localStorage.getItem('persistedVotes')) : []

const isUpvoted = songId => {
  let persistedVotes = readVotesFromStorage()
  return contains(songId, persistedVotes)
}

const Upvote = ({changeVote, songId}) => {
  if (isUpvoted(songId)) return <div>VOTED!</div>
  return (
    <div>
      <img alt={'vote-up'} src={Arrow} className="arrow-up" onClick={() => changeVote(1)} />
    </div>
  )
}

export default Upvote
