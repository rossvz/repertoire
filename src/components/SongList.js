import React, { Component } from 'react'
import Firebase from '../Firebase'
import NewSongForm from './NewSongForm'
import Song from './Song'

class SongList extends Component {
  constructor () {
    super()
    this.state = {songs: [], editing: false}
  }

  componentDidMount () {
    let songsRef = Firebase.database().ref('songs')
    songsRef.on('child_added', snapshot => {
      let song = snapshot.val()
      song.id = snapshot.key
      this.setState({songs: [ song ].concat(this.state.songs)})
    })
  }

  createSong () {
    this.setState({...this.state, editing: true})
  }

  displayNewSong () {
    if (!this.state.editing) return <button onClick={this.createSong.bind(this)}>New Song</button>
    return <NewSongForm />
  }

  renderSongs () {
    return this.state.songs.map(song => <Song key={song.id} song={song} />)
  }

  render () {
    return (
      <div>
        {this.renderSongs()}
        {this.displayNewSong()}
      </div>
    )
  }
}

SongList.propTypes = {}
SongList.defaultProps = {}

export default SongList
