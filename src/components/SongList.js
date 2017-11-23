import _ from 'lodash'
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
    let songsRef = Firebase.database().ref('songs').orderByChild('votes')
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

  changeVote (song, value) {
    song.votes = song.votes || 0
    song.votes += value
    Firebase.database().ref().child('songs/' + song.id).update({votes: song.votes}).then(results => {
      console.log(song, value, results)
      let songs = this.state.songs
      let index = this.state.songs.findIndex(s => s.id === song.id)
      songs.splice(index, 1, song)
      songs = _.orderBy(songs, [ 'votes' ], [ 'desc' ])
      this.setState({...this.state, songs})
    }).catch(err => {
      console.error(err)
    })
  }

  renderSongs () {
    return this.state.songs.map(song => <Song changeVote={(value) => { this.changeVote(song, value) }} key={song.id} song={song} />)
  }

  render () {
    return (
      <div className='SongList'>
        {this.displayNewSong()}
        {this.renderSongs()}
      </div>
    )
  }
}

SongList.propTypes = {}
SongList.defaultProps = {}

export default SongList
