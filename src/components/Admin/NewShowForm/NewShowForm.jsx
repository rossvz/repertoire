import React, { useState } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ref, set, push } from "firebase/database"
import { useDatabase, useSigninCheck } from "reactfire"

import Button from "../../common/Button"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

const INITIAL_STATE = { date: "", venue: "", time: "" }

export const NewShowWrapper = () => {
  const database = useDatabase()
  const showsRef = ref(database, "shows")
  const [editingNewShow, setEditingNewShow] = React.useState(false)
  const { status, data } = useSigninCheck()

  const saveShow = (newShow) => {
    const newShowRef = push(showsRef)
    set(newShowRef, newShow)
  }
  if (status === "loading" || !data.signedIn) return null
  return editingNewShow ? (
    <NewShowForm
      saveShow={saveShow}
      toggleEditingNewShow={() => setEditingNewShow(false)}
    />
  ) : (
    <Button onClick={() => setEditingNewShow(true)}>
      <FontAwesomeIcon style={styles.icon} icon={faPlusCircle} />
      Show
    </Button>
  )
}

export const NewShowForm = ({ saveShow, toggleEditingNewShow }) => {
  const [formState, setFormState] = useState(INITIAL_STATE)
  const { date, venue, time } = formState

  const onAutocompleteChange = (venue) => {
    setFormState({ ...formState, venue })
  }

  const handleSaveShow = (e) => {
    e.preventDefault()
    geocodeByAddress(venue)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        saveShow({ date, venue, time, latLng })
      })
      .catch((error) => console.error("Error", error))
    setFormState(INITIAL_STATE)
  }

  const onDateChange = (e) => {
    setFormState({ ...formState, date: e.target.value })
  }

  const onTimeChange = (e) => {
    setFormState({ ...formState, time: e.target.value })
  }

  const cancelShow = (e) => {
    e.preventDefault()
    toggleEditingNewShow()
    setFormState(INITIAL_STATE)
  }

  const AutocompleteItem = ({ formattedSuggestion }) => (
    <div
      style={{
        paddingTop: "8px",
        borderBottom: "2px solid black",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <strong>{formattedSuggestion.mainText}</strong>
      <small style={{ fontSize: "12px", textAlign: "right" }}>
        {formattedSuggestion.secondaryText}
      </small>
    </div>
  )

  const options = {
    types: ["establishment"],
  }

  return (
    <div style={styles.backdrop}>
      <div style={styles.container}>
        <form onSubmit={handleSaveShow} style={styles.formStyles}>
          <input
            style={styles.inputStyles}
            type="date"
            placeholder={"Date"}
            onChange={onDateChange}
            value={date}
          />
          <PlacesAutocomplete
            value={venue}
            onChange={onAutocompleteChange}
            searchOptions={options}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    style: styles.inputStyles,
                  })}
                />
                <div
                  style={{
                    backgroundColor: "#3a3a3a",
                    color: "#f8f8f8",
                    cursor: "pointer",
                  }}
                >
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: "#f8f8f8", color: "#3a3a3a" }
                      : {}
                    return (
                      <div
                        key={suggestion.description}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        <AutocompleteItem
                          formattedSuggestion={suggestion.formattedSuggestion}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <input
            style={styles.inputStyles}
            type="datetime"
            placeholder={"Time"}
            onChange={onTimeChange}
            value={time}
          />
          <div style={styles.buttonContainer}>
            <Button onClick={cancelShow}>Cancel</Button>
            <Button onClick={handleSaveShow}>Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.8)",
    zIndex: 1,
  },
  container: {
    position: "absolute",
    top: "5%",
    left: "1%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white",
    borderRadius: "10px",
    padding: "5px",
    backgroundColor: "black",
  },
  icon: { marginRight: "10px" },
  formStyles: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    padding: "0",
  },
  inputStyles: {
    lineHeight: "1.4em",
    fontSize: "1.2em",
    textAlign: "center",
    border: "none",
    backgroundColor: "#3a3a3a",
    color: "#b3b3b3",
    margin: "1% 0",
    width: "90vw",
  },
  autocompleteStyles: {
    input: {
      fontSize: "1.5em",
      textAlign: "center",
      border: "none",
      backgroundColor: "#f8f8f8",
      width: "90vw",
      padding: "10px 0",
    },
  },
  results: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: "#19181c",
    color: "white",
    fontSize: "1em",
    border: "none",
    padding: "2%",
    flex: "1",
  },
  saveShowButton: {
    backgroundColor: "white",
    color: "black",
    fontSize: "1em",
    border: "none",
    padding: "2%",
    flex: "1",
  },
}
