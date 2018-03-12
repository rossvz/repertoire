import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'
import { searchSpotify } from 'util/Spotify'
import Button from 'components/common/Button'

const INITIAL_STATE = {title: '', artist: '', album: '', votes: 0, results: [], resultIndex: 0, visible: true}

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
    const {title, artist, album, votes, albumArtwork, visible} = this.state
    this.props.firebase.push('/songs', {title, artist, album, votes, albumArtwork, visible})
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
    else return <button disabled={true} style={styles.disabled}>NEXT</button>
  }

  renderPreviousResult () {
    if (this.state.resultIndex > 0) return <button onClick={this.previousResult.bind(this)}>PREV</button>
    else return <button disabled={true} style={styles.disabled}>PREV</button>
  }

  render () {
    return (
      <div>
        <form onSubmit={this.searchSong.bind(this)} style={styles.formStyles}>
          <input style={styles.inputStyles} type="text" placeholder={'Title'} onChange={this.onTitleChange.bind(this)} value={this.state.title} />
          <input style={styles.inputStyles} type="text" placeholder={'Artist (optional)'} onChange={this.onArtistChange.bind(this)}
                 value={this.state.artist} />
          <div style={styles.inputStyles}>{this.state.album}</div>
          <button style={styles.addSongStyles} type="submit">SEARCH</button>
        </form>
        <div style={styles.results}>
          {this.renderPreviousResult()}
          <img height="300px" width="300px" src={this.state.albumArtwork} alt="" />
          {this.renderNextResult()}
        </div>
        <div style={styles.buttonContainer}>
          <Button onClick={this.cancelSong.bind(this)}>CANCEL</Button>
          <Button onClick={this.saveSong.bind(this)}>SAVE</Button>
        </div>
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}

NewSongForm.propTypes = {}
NewSongForm.defaultProps = {}

export default withFirebase(NewSongForm)
