import React, { Component } from 'react'
import {
  mapObjIndexed,
  prop,
  reverse,
  sortBy,
} from 'ramda'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import NewSongForm from './NewSongForm'
import Song from './Song'

class SongList extends Component {
  state = { editing: false }

  createSong = () => {
    this.setState({ editing: true })
  }

  displayNewSong = () => {
    if (!this.state.editing) return <button onClick={this.createSong}>New Song</button>
    return <NewSongForm />
  }

  changeVote = song => value => {
    const votes = song.votes || 0
    const newVotes = votes + value;
    this.props.firebase.update(`/songs/${song.id}`, { votes: newVotes })
  }

  renderSongs = () => this.props.songs.map(song =>
    <Song changeVote={this.changeVote(song)} key={song.id} song={song} />
  )

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

const sortDescByVotes = compose(
  reverse,
  sortBy(prop('votes')),
  Object.values,
  mapObjIndexed((song, id) => ({ ...song, id }))
)

export default compose(
  firebaseConnect([
    'songs'
  ]),
  connect(
    ({ firebase }) => ({
      songs: sortDescByVotes(firebase.data.songs),
    })
  )
)(SongList)
