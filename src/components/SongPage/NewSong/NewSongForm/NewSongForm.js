import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'

const INITIAL_STATE = {title: '', artist: '', album: '', votes: 0}
class NewSongForm extends Component {
  constructor (props) {
    super(props)
    this.state = INITIAL_STATE
  }

  saveSong (e) {
    e.preventDefault()
    const {title, artist, album, votes} = this.state
    this.props.firebase.push('/songs', {title, artist, album, votes})
    this.props.toggleIsEditing()
    this.setState(INITIAL_STATE)
  }

  onTitleChange (e) {
    this.setState({...this.state, title: e.target.value})
  }

  onArtistChange (e) {
    this.setState({...this.state, artist: e.target.value})
  }

  onAlbumChange (e) {
    this.setState({...this.state, album: e.target.value})
  }

  cancelSong (e) {
    this.props.toggleIsEditing()
    this.setState(INITIAL_STATE)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.saveSong.bind(this)} style={styles.formStyles}>
          <input style={styles.inputStyles} type="text" placeholder={'Title'} onChange={this.onTitleChange.bind(this)} value={this.state.title} />
          <input style={styles.inputStyles} type="text" placeholder={'Artist'} onChange={this.onArtistChange.bind(this)} value={this.state.artist} />
          <input style={styles.inputStyles} type="text" placeholder={'Album'} onChange={this.onAlbumChange.bind(this)} value={this.state.album} />
          <button style={styles.addSongStyles} type="submit">Save</button>
        </form>
        <button onClick={this.cancelSong.bind(this)}>Cancel</button>
      </div>
    )
  }
}

const styles = {
  formStyles: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    padding: '5%'
  },
  inputStyles: {
    lineHeight: '1.8em',
    fontSize: '1.5em',
    textAlign: 'center',
    border: 'none',
    backgroundColor: '#f8f8f8',
    margin: '1%',
    width: '90vw'
  },
  addSongStyles: {
    fontSize: '1.5em',
    padding: '1%',
    borderRadius: '5px',
    background: '#f8f8f8',
    color: '#333'
  }
}

NewSongForm.propTypes = {}
NewSongForm.defaultProps = {}

export default withFirebase(NewSongForm)
