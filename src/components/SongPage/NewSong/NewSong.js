import React from 'react'
import PropTypes from 'prop-types'
import NewSongForm from './NewSongForm/index'

const styles = {
  container: {
    marginTop: 20,
    textAlign: 'center',
  },
  addSongStyles: {
    fontSize: '1em',
    padding: '2%',
    borderRadius: '100em',
    background: '#f8f8f8',
    color: '#333'
  }
}

const NewSong = ({isEditing, toggleIsEditing, firebase}) =>
  firebase.auth().currentUser
    ? <div style={styles.container}>
      {
        isEditing
          ? <NewSongForm toggleIsEditing={toggleIsEditing} />
          : <button style={styles.addSongStyles} onClick={toggleIsEditing}>ADD SONG</button>
      }
    </div>
    : <div></div>

NewSong.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
}

export default NewSong
