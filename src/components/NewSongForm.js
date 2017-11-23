import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'

const INITIAL_STATE = {title: '', artist: '', album: '', votes: 0}
class NewSongForm extends Component {
  constructor () {
    super()
    this.state = INITIAL_STATE
  }

  saveSong (e) {
    e.preventDefault()
    const {title, artist, album, votes} = this.state
    this.props.firebase.push('/songs', {title, artist, album, votes})
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

  render () {
    return (
      <form onSubmit={this.saveSong.bind(this)} className='new-song-form'>
        <input type='text' placeholder={'Title'} onChange={this.onTitleChange.bind(this)} value={this.state.title} />
        <input type='text' placeholder={'Artist'} onChange={this.onArtistChange.bind(this)} value={this.state.artist} />
        <input type='text' placeholder={'Album'} onChange={this.onAlbumChange.bind(this)} value={this.state.album} />
        <button type='submit'>Save</button>
      </form>
    )
  }
}

NewSongForm.propTypes = {}
NewSongForm.defaultProps = {}

export default withFirebase(NewSongForm)
