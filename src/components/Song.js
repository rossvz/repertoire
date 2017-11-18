import React from 'react'

const Song = ({song}) => {
  return (
    <div>
      <h2>{song.title}</h2>
      <h4>{song.artist}</h4>
      <p>{song.album}</p>
    </div>
  )
}

export default Song
