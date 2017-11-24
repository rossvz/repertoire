import React from 'react'
import PropTypes from 'prop-types'
import NewSongForm from 'components/NewSongForm'
import Song from 'components/Song'

const SongList = ({
  changeVote,
  isEditing,
  songs,
  toggleIsEditing,
}) => (
  <div className='SongList'>
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

export default SongList
