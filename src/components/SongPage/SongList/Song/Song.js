import React from 'react'
import Upvote from './Upvote'
import AlbumArtwork from './AlbumArtwork'
import ResetVotes from './ResetVotes'
import Visibility from './Visibility'

const Song = ({song, changeVote, changeVisible, firebase}) => {
  if (!firebase.auth().currentUser && !song.visible) return <div></div>
  return (
    <div style={setStyles(song)}>
      <div style={styles.columnStyles}>
        <AlbumArtwork albumArtwork={song.albumArtwork} />
        <div style={styles.songInfoStyles}>
          <h2>{song.title}</h2>
          <h4>{song.artist}</h4>
          <p>{song.album}</p>
        </div>
        <div style={styles.actionStyles}>
          <Upvote changeVote={changeVote} songId={song.id} />
          <p>{song.votes}</p>
          <div style={ styles.row }>
            <Visibility visible={song.visible} changeVisible={changeVisible} />
          </div>
          <div style={ styles.row }>
            <ResetVotes resetVotes={ () => changeVote(-song.votes) } />
          </div>
        </div>
      </div>
    </div>
  )
}

const setStyles = song => {
  if (song.visible) return styles.songStyles
  else return styles.invisibleSongStyles
}

const styles = {
  songStyles: {
    width: '100%',
    margin: '2% 20%',
    boxShadow: '#d8d8d8 3px 5px 10px',
    backgroundSize: 'cover',
    // background: 'linear-gradient(135deg, rgba(136, 17, 204, 0.4), rgba(17, 136, 204, 0.4)) fixed'
  },
  invisibleSongStyles: {
    opacity: 0.4,
    width: '100%',
    margin: '2% 20%',
    boxShadow: '#d8d8d8 3px 5px 10px',
    backgroundSize: 'cover',
    // background: 'linear-gradient(135deg, rgba(136, 17, 204, 0.4), rgba(17, 136, 204, 0.4)) fixed'
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
    padding: '0 5%',
    flex: 3
  },
  row: {
    marginBottom: 10,
  },
}

export default Song
