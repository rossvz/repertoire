import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'
import { searchSpotify } from 'util/Spotify'

const INITIAL_STATE = {title: '', artist: '', album: '', votes: 0, results: [], resultIndex: 0}

class NewSongForm extends Component {
  constructor (props) {
    super(props)
    this.state = INITIAL_STATE
  }

  async searchSong (e) {
    e.preventDefault()
    const {title, artist} = this.state

    const results = await searchSpotify({title, artist})
    console.log('spotify results', results)
    this.setState({
      ...this.state,
      resultIndex: 0,
      results: results.tracks.items
    })
    this.nextResult(false)

  }

  saveSong () {
    const {title, artist, album, votes, albumArtwork} = this.state
    this.props.firebase.push('/songs', {title, artist, album, votes, albumArtwork})
    this.props.toggleIsEditing()
    this.setState(INITIAL_STATE)
  }

  nextResult (increment = true) {
    const index = increment ? this.state.resultIndex + 1 : this.state.resultIndex
    const result = this.state.results[ index ]
    if (!result) return
    this.setState({
      ...this.state,
      artist: result.artists[ 0 ].name,
      album: result.album.name,
      title: result.name,
      albumArtwork: result.album.images[ 0 ].url,
      resultIndex: index
    })
  }

  previousResult () {
    const index = this.state.resultIndex - 1
    const result = this.state.results[ index ]
    if (!result) return
    this.setState({
      ...this.state,
      artist: result.artists[ 0 ].name,
      album: result.album.name,
      title: result.name,
      albumArtwork: result.album.images[ 0 ].url,
      resultIndex: index
    })
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

  renderNextResult () {
    if (this.state.resultIndex + 1 < this.state.results.length) return <button onClick={this.nextResult.bind(this)}>NEXT</button>
  }

  renderPreviousResult () {
    if (this.state.resultIndex > 0) return <button onClick={this.previousResult.bind(this)}>PREV</button>
    else return <div></div>
  }

  render () {
    return (
      <div>
        <form onSubmit={this.searchSong.bind(this)} style={styles.formStyles}>
          <input style={styles.inputStyles} type="text" placeholder={'Title'} onChange={this.onTitleChange.bind(this)} value={this.state.title} />
          <input style={styles.inputStyles} type="text" placeholder={'Artist'} onChange={this.onArtistChange.bind(this)} value={this.state.artist} />
          <input style={styles.inputStyles} readOnly={true} type="text" placeholder={'Album'} value={this.state.album} />
          <button style={styles.addSongStyles} type="submit">Search</button>
        </form>
        {this.renderPreviousResult()}
        <img height="300px" width="300px" src={this.state.albumArtwork} alt="" />
        {this.renderNextResult()}
        <button onClick={this.cancelSong.bind(this)}>Cancel</button>
        <button onClick={this.saveSong.bind(this)}>Save</button>
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
