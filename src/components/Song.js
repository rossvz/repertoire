import React from 'react'
import ArrowUp from '../img/arrow-up.svg'

const Song = ({song}) => {
  return (
    <div className='Song'>
      <div className='Song_columns'>
        <div className='Song_info'>
          <h2>{song.title}</h2>
          <h4>{song.artist}</h4>
          <p>{song.album}</p>
        </div>
        <div className='Song_actions'>
          <img src={ArrowUp} className='arrow-up' />
          <img src={ArrowUp} className='arrow-down' />
        </div>
      </div>
    </div>
  )
}

export default Song
