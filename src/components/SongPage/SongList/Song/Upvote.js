import React from 'react'
import { isUpvoted } from 'util/votes'

const Upvote = ({changeVote, songId}) => {
  const styles = {
    arrowStyles: {
      width: '50px',
      fill: isUpvoted(songId) ? 'orangered' : ''
    }
  }
  return (
    <div>
      <svg onClick={() => changeVote(isUpvoted(songId) ? -1 : 1)}
           style={styles.arrowStyles}
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 512 640">
        <path d="M128 320l128-128 128 128" />
      </svg>
    </div>
  )
}

export default Upvote
