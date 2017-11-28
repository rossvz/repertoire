import { contains } from 'ramda'
import React from 'react'
import { readVotesFromStorage } from 'util/votes'

const Upvote = ({changeVote, songId}) => {
  const isUpvoted = contains(songId, readVotesFromStorage())
  const styles = {
    arrowStyles: {
      width: '50px',
      fill: isUpvoted ? 'orangered' : ''
    }
  }
  return (
    <div onClick={() => changeVote(isUpvoted ? -1 : 1)}
         style={styles.arrowStyles}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 640">
        <path d="M128 320l128-128 128 128" />
      </svg>
    </div>
  )
}

export default Upvote
