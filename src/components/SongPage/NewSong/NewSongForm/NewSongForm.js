import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'
import { searchSpotify } from 'util/Spotify'
import Button from 'components/common/Button'

const INITIAL_STATE = {
  title: '',
  artist: '',
  album: '',
  votes: 0,
  results: [],
  resultIndex: 0,
  visible: true
}

class NewSongForm extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  async searchSong(e) {
    e.preventDefault()
    const { title, artist } = this.state

    const results = await searchSpotify({ title, artist })
    console.log('spotify results', results)
    this.setState({
      ...this.state,
      resultIndex: 0,
      results: results.tracks.items
    })
    this.nextResult(false)
  }

  saveSong() {
    const { title, artist, album, votes, albumArtwork, visible } = this.state
    this.props.firebase.push('/songs', {
      title,
      artist,
      album,
      votes,
      albumArtwork,
      visible
    })
    this.props.toggleIsEditing()
    this.setState(INITIAL_STATE)
  }

  nextResult(increment = true) {
    const index = increment
      ? this.state.resultIndex + 1
      : this.state.resultIndex
    const result = this.state.results[index]
    if (!result) return
    this.setState({
      ...this.state,
      artist: result.artists[0].name,
      album: result.album.name,
      title: result.name,
      albumArtwork: result.album.images[0].url,
      resultIndex: index
    })
  }

  previousResult() {
    const index = this.state.resultIndex - 1
    const result = this.state.results[index]
    if (!result) return
    this.setState({
      ...this.state,
      artist: result.artists[0].name,
      album: result.album.name,
      title: result.name,
      albumArtwork: result.album.images[0].url,
      resultIndex: index
    })
  }

  onTitleChange(e) {
    this.setState({ ...this.state, title: e.target.value })
  }

  onArtistChange(e) {
    this.setState({ ...this.state, artist: e.target.value })
  }

  onAlbumChange(e) {
    this.setState({ ...this.state, album: e.target.value })
  }

  cancelSong(e) {
    this.props.toggleIsEditing()
    this.setState(INITIAL_STATE)
  }

  renderNextResult() {
    if (this.state.resultIndex + 1 < this.state.results.length)
      return (
        <Button type="button" onClick={this.nextResult.bind(this)}>
          NEXT
        </Button>
      )
    else
      return (
        <Button type="button" disabled={true} style={styles.disabled}>
          NEXT
        </Button>
      )
  }

  renderPreviousResult() {
    if (this.state.resultIndex > 0)
      return (
        <Button type="button" onClick={this.previousResult.bind(this)}>
          PREV
        </Button>
      )
    else
      return (
        <Button type="button" disabled={true} style={styles.disabled}>
          PREV
        </Button>
      )
  }

  render() {
    return (
      <div style={styles.newSongContainer}>
        <div style={styles.closeButton}>
          <Button onClick={this.cancelSong.bind(this)}>X</Button>
        </div>
        <form onSubmit={this.searchSong.bind(this)} style={styles.formStyles}>
          <input
            style={styles.inputStyles}
            type="text"
            placeholder={'Title'}
            onChange={this.onTitleChange.bind(this)}
            value={this.state.title}
          />
          <input
            style={styles.inputStyles}
            type="text"
            placeholder={'Artist (optional)'}
            onChange={this.onArtistChange.bind(this)}
            value={this.state.artist}
          />
          <input
            style={styles.inputStyles}
            value={this.state.album}
            onChange={this.onAlbumChange.bind(this)}
          />
          <div style={styles.findButtonContainer}>
            {this.renderPreviousResult()}
            <Button type="submit">SEARCH</Button>
            {this.renderNextResult()}
          </div>
        </form>
        <div style={styles.results}>
          <img
            height="100px"
            width="100px"
            src={this.state.albumArtwork}
            alt=""
          />
        </div>
        <div style={styles.buttonContainer}>
          <Button onClick={this.saveSong.bind(this)}>SAVE</Button>
        </div>
      </div>
    )
  }
}

const styles = {
  newSongContainer: {
    border: '2px solid white',
    borderRadius: '5px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    zIndex: '2',
    boxShadow: 'rgba(0, 0, 0, 0.75) -1px 4px 20px 8px'
  },
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
    width: '85vw'
  },
  addSongStyles: {
    fontSize: '1em',
    borderRadius: '100em',
    padding: '2%',
    background: '#f8f8f8',
    color: '#333'
  },
  results: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  disabled: {
    opacity: 0.5
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  findButtonContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '85vw'
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

NewSongForm.propTypes = {}
NewSongForm.defaultProps = {}

export default withFirebase(NewSongForm)
