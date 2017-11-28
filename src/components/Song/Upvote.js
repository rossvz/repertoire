import { contains } from 'ramda'
import React from 'react'
import { readVotesFromStorage } from 'util/votes'

const isUpvoted = songId => {
  let persistedVotes = readVotesFromStorage()
  return contains(songId, persistedVotes)
}

const Upvote = ({changeVote, songId}) => {
  const styles = {
    arrowStyles: {
      width: '50px',
      fill: isUpvoted(songId) ? 'orangered' : ''
    }
  }
  return (
    <div onClick={() => changeVote(isUpvoted(songId) ? -1 : 1)}
         style={styles.arrowStyles}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 640">
        <path d="M128 320l128-128 128 128" />
      </svg>
    </div>
  )
}

export default Upvote
