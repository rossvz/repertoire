import React from 'react'
import Upvote from './Upvote'

const Song = ({song, changeVote}) => {
  return (
    <div className='Song'>
      <div className='Song_columns'>
        <div className='Song_info'>
          <h2>{song.title}</h2>
          <h4>{song.artist}</h4>
          <p>{song.album}</p>
          <small>{song.votes} votes</small>
        </div>
        <div className='Song_actions'>
          <Upvote changeVote={changeVote} songId={song.id}/>
        </div>
      </div>
    </div>
  )
}

export default Song
