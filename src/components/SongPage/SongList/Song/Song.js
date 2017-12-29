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
          <div style={styles.title}>{song.title}</div>
          <div style={styles.artist}>{song.artist}</div>
          <div>{song.album}</div>
        </div>
        <div style={styles.actionStyles}>
          <Upvote changeVote={changeVote} songId={song.id} />
          <p>{song.votes}</p>
          <div>
            <Visibility visible={song.visible} changeVisible={changeVisible} />
          </div>
          <div>
            <ResetVotes resetVotes={() => changeVote(-song.votes)} />
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
    // boxShadow: '#d8d8d8 3px 5px 10px',
    backgroundSize: 'cover',
    paddingBottom: '3%',
    borderBottom: '3px solid #544E58'
    // background: 'linear-gradient(135deg, rgba(136, 17, 204, 0.4), rgba(17, 136, 204, 0.4)) fixed'
  },
  invisibleSongStyles: {
    opacity: 0.4,
    width: '100%',
    margin: '2% 20%',
    // boxShadow: '#d8d8d8 3px 5px 10px',
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
    opacity: 0.5,
    color: '#fff'

  },
  songInfoStyles: {
    padding: '0 5%',
    flex: 3,
    color: '#fff'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.3em',
    letterSpacing: '0.1em'
    // textTransform: 'uppercase'
  },
  artist: {
    color: '#B4CBEA',
    fontSize: '1em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '5% 0'
  },
  row: {
    marginBottom: 10,
  }
}

export default Song
