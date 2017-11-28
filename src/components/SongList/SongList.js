import NewSongForm from 'components/NewSongForm'
import Song from 'components/Song/Song'
import PropTypes from 'prop-types'
import React from 'react'

const SongList = ({
                    changeVote,
                    isEditing,
                    songs,
                    toggleIsEditing,
                  }) => (
  <div style={styles.songListStyles}>
    {
      isEditing
        ? <NewSongForm />
        : <button onClick={toggleIsEditing}>New Song</button>
    }
    {
      songs.map(
        song => <Song key={song.id} changeVote={changeVote(song)} song={song} />
      )
    }
  </div>
)

SongList.propTypes = {
  changeVote: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      album: PropTypes.string,
      artist: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
      votes: PropTypes.number,
    })
  ).isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
}

const styles = {
  songListStyles: {
    margin: '0 auto !important',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%'
  }
}

export default SongList
