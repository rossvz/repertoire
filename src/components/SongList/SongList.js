import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewSongForm from 'components/NewSongForm'
import Song from 'components/Song'

export default class SongList extends Component {
  state = { editing: false }

  createSong = () => {
    this.setState({ editing: true })
  }

  displayNewSong = () => {
    if (!this.state.editing) return <button onClick={this.createSong}>New Song</button>
    return <NewSongForm />
  }

  renderSongs = () => this.props.songs.map(song =>
    <Song changeVote={this.props.changeVote(song)} key={song.id} song={song} />
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

SongList.defaultProps = {}
