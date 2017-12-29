import Song from 'components/SongPage/SongList/Song'
import PropTypes from 'prop-types'
import React from 'react'

const SongList = ({changeVote, songs, changeVisible}) => (
  <div style={styles.songListStyles}>
    {
      songs.map(
        song => <Song key={song.id} changeVote={changeVote(song)} song={song} changeVisible={changeVisible(song)} />
      )
    }
  </div>
)

SongList.propTypes = {
  changeVote: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      album: PropTypes.string,
      artist: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
      votes: PropTypes.number,
    })
  ).isRequired,
}

const styles = {
  songListStyles: {
    margin: '0 auto !important',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  }
}

//1E1D22

export default SongList
