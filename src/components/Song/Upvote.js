import { contains } from 'ramda'
import React from 'react'
import Arrow from '../../img/arrow-up.svg'
import { readVotesFromStorage } from 'util/votes'

const isUpvoted = songId => {
  let persistedVotes = readVotesFromStorage()
  return contains(songId, persistedVotes)
}

const Upvote = ({changeVote, songId}) => {
  if (isUpvoted(songId)) return <div>VOTED!</div>
  return (
    <div>
      <img alt={'vote-up'} src={Arrow} onClick={() => changeVote(1)} style={styles.arrowStyles} />
    </div>
  )
}

const styles = {
  arrowStyles: {
    width: '50px',
  }
}

export default Upvote
