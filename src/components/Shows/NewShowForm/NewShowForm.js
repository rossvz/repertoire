import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import AddShowButton from "./AddShowButton";

const INITIAL_STATE = { date: "", venue: "", time: "" };

class NewShowForm extends Component {
  state = INITIAL_STATE;

  onAutocompleteChange(venue) {
    this.setState({ ...this.state, venue });
  }

  saveShow(e) {
    e.preventDefault();
    const { date, venue, time } = this.state;
    geocodeByAddress(this.state.venue)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.firebase.push("/shows", { date, venue, time, latLng });
      })
      .catch(error => console.error("Error", error));
    this.setState(INITIAL_STATE);
  }

  onDateChange(e) {
    this.setState({ ...this.state, date: e.target.value });
  }

  onTimeChange(e) {
    this.setState({ ...this.state, time: e.target.value });
  }

  cancelShow(e) {
    e.preventDefault();
    this.props.toggleEditingNewShow();
    this.setState(INITIAL_STATE);
  }

  render() {
    const inputProps = {
      value: this.state.venue,
      onChange: this.onAutocompleteChange.bind(this),
      placeholder: "Search Places..."
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        <strong>{formattedSuggestion.mainText}</strong>
        <br />
        <small>{formattedSuggestion.secondaryText}</small>
      </div>
    );

    const options = {
      types: ["establishment"]
    };

    // todo: refactor this to redux, separate compnents
    return (
      <div style={styles.container}>
        {this.props.editingNewShow ? (
          <div style={styles.container}>
            <form onSubmit={this.saveShow.bind(this)} style={styles.formStyles}>
              <input
                style={styles.inputStyles}
                type="date"
                placeholder={"Date"}
                onChange={this.onDateChange.bind(this)}
                value={this.state.date}
              />
              <PlacesAutocomplete
                inputProps={inputProps}
                autocompleteItem={AutocompleteItem}
                styles={styles.autocompleteStyles}
                options={options}
              />
              <input
                style={styles.inputStyles}
                type="datetime"
                placeholder={"Time"}
                onChange={this.onTimeChange.bind(this)}
                value={this.state.time}
              />
              <div style={styles.buttonContainer}>
                <button
                  style={styles.cancelButton}
                  onClick={this.cancelShow.bind(this)}
                >
                  CANCEL
                </button>
                <button
                  style={styles.saveShowButton}
                  onClick={this.saveShow.bind(this)}
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        ) : (
          <AddShowButton
            toggleEditingNewShow={this.props.toggleEditingNewShow}
          />
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  formStyles: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    padding: "5%"
  },
  inputStyles: {
    lineHeight: "1.8em",
    fontSize: "1.5em",
    textAlign: "center",
    border: "none",
    backgroundColor: "#f8f8f8",
    margin: "1%",
    width: "90vw"
  },
  autocompleteStyles: {
    input: {
      fontSize: "1.5em",
      textAlign: "center",
      border: "none",
      backgroundColor: "#f8f8f8",
      width: "90vw",
      padding: "10px 0"
    }
  },
  results: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  disabled: {
    opacity: 0.5
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cancelButton: {
    backgroundColor: "#19181c",
    color: "white",
    fontSize: "1em",
    border: "none",
    padding: "2%",
    flex: "1"
  },
  saveShowButton: {
    backgroundColor: "white",
    color: "black",
    fontSize: "1em",
    border: "none",
    padding: "2%",
    flex: "1"
  }
};

export default NewShowForm;
