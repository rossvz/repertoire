import React from 'react'
import Arrow from '../img/arrow-up.svg'

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
          <img alt={'vote-up'} src={Arrow} className='arrow-up' onClick={() => changeVote(1)} />
          <img alt={'vote-down'} src={Arrow} className='arrow-down' onClick={() => changeVote(-1)} />
        </div>
      </div>
    </div>
  )
}

export default Song
