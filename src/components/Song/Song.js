import React from 'react'
import Upvote from './Upvote'

const Song = ({song, changeVote}) => {
  return (
    <div style={styles.songStyles}>
      <div style={styles.columnStyles}>
        <div style={styles.actionStyles}>
          <Upvote changeVote={changeVote} songId={song.id} />
          <p>{song.votes}</p>
        </div>
        <div style={styles.songInfoStyles}>
          <h2>{song.title}</h2>
          <h4>{song.artist}</h4>
          <p>{song.album}</p>
        </div>

      </div>
    </div>
  )
}

const styles = {
  songStyles: {
    width: '100%',
    margin: '2% 20%'
  },
  columnStyles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  actionStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    opacity: 0.5
  },
  songInfoStyles: {
    border: '1px solid #d8d8d8',
    padding: '0 5%',
    flex: 3,
    boxShadow: '#d8d8d8 3px 5px 10px'
  }
}

export default Song
