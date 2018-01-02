import React, { Component } from 'react'
import { withFirebase } from 'react-redux-firebase'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const INITIAL_STATE = {date: '', venue: '', time: ''}

class NewShowForm extends Component {
  constructor (props) {
    super(props)
    this.state = INITIAL_STATE
    this.onAutocompleteChange = (venue) => this.setState({...this.state, venue})
  }

  saveShow () {
    const {date, venue, time} = this.state
    geocodeByAddress(this.state.venue)
      .then(results => getLatLng(results[ 0 ]))
      .then(latLng => {
        this.props.firebase.push('/shows', {date, venue, time, latLng})
      })
      .catch(error => console.error('Error', error))
    this.setState(INITIAL_STATE)
  }

  onDateChange (e) {
    this.setState({...this.state, date: e.target.value})
  }

  onTimeChange (e) {
    this.setState({...this.state, time: e.target.value})
  }

  cancelShow (e) {
    this.setState(INITIAL_STATE)
  }

  render () {
    const inputProps = {
      value: this.state.venue,
      onChange: this.onAutocompleteChange,
      placeholder: 'Search Places...',
    }

    const AutocompleteItem = ({formattedSuggestion}) => <div>
      <strong>{formattedSuggestion.mainText}</strong>
      <br />
      <small>{formattedSuggestion.secondaryText}</small>
    </div>

    const options = {
      types: [ 'establishment' ]
    }
    return (
      <div>
        <form onSubmit={this.saveShow.bind(this)} style={styles.formStyles}>
          <input style={styles.inputStyles} type="date" placeholder={'Date'} onChange={this.onDateChange.bind(this)} value={this.state.date} />
          <PlacesAutocomplete inputProps={inputProps} autocompleteItem={AutocompleteItem} styles={styles.autocompleteStyles} options={options} />
          <input style={styles.inputStyles} type="datetime" placeholder={'Time'} onChange={this.onTimeChange.bind(this)} value={this.state.time} />
        </form>
        <div style={styles.buttonContainer}>
          <button style={styles.cancelButton} onClick={this.cancelShow.bind(this)}>CANCEL</button>
          <button style={styles.saveShowButton} onClick={this.saveShow.bind(this)}>SAVE</button>
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
  autocompleteStyles: {
    input: {
      fontSize: '1.5em',
      textAlign: 'center',
      border: 'none',
      backgroundColor: '#f8f8f8',
      width: '90vw',
      padding: '10px 0'
    },
  },
  addShowStyles: {
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
  },
  cancelButton: {
    backgroundColor: '#19181c',
    color: 'white',
    fontSize: '1em',
    border: 'none',
    padding: '2%',
    flex: '1'
  },
  saveShowButton: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: '1em',
    border: 'none',
    padding: '2%',
    flex: '1'
  }
}

NewShowForm.propTypes = {}
NewShowForm.defaultProps = {}

export default withFirebase(NewShowForm)
