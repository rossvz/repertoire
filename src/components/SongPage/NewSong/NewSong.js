import React from 'react'
import PropTypes from 'prop-types'
import NewSongForm from './NewSongForm/index'

const styles = {
  container: {
    marginTop: 20,
    textAlign: 'center',
  },
}

const NewSong = ({isEditing, toggleIsEditing, firebase}) =>
  firebase.auth().currentUser
    ? <div style={styles.container}>
      {
        isEditing
          ? <NewSongForm />
          : <button onClick={toggleIsEditing}>Add Song</button>
      }
    </div>
    : <div></div>

NewSong.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
}

export default NewSong
