import React, { Component, useEffect, useReducer, useState } from "react"
import { searchSpotify, getArtistGenre, search } from "util/Spotify"
import Button from "components/common/Button"
import moment from "moment"
import { ref, set, push, child, update } from "firebase/database"
import { useDatabase } from "reactfire"

const INITIAL_SONG_STATE = {
  title: "",
  artist: "",
  artistUrl: "",
  album: "",
  votes: 0,
  visible: true
}

export const NewSongForm = ({ toggleIsEditing }) => {
  const [titleQuery, setTitleQuery] = useState("")
  const [artistQuery, setArtistQuery] = useState("")
  const [results, setResults] = useState([])
  const [resultIndex, setResultIndex] = useState(0)
  const [newSong, setNewSong] = useState(INITIAL_SONG_STATE)

  const database = useDatabase()
  const songsRef = ref(database, "songs")

  const searchSong = e => {
    e.preventDefault()
    search({ title: titleQuery, artist: artistQuery }).then(results => {
      setResults(results.data.items)
      setTitleQuery("")
      setArtistQuery("")
      setResultIndex(0)
    })
  }
  const nextResult = () => {
    const newIndex = resultIndex + 1 > results.length - 1 ? 0 : resultIndex + 1
    setResultIndex(newIndex)
  }
  const previousResult = () => {
    const newIndex = resultIndex - 1 < 0 ? results.length - 1 : resultIndex - 1
    setResultIndex(newIndex)
  }

  const saveSong = () => {
    const newSongRef = push(songsRef)
    set(newSongRef, newSong)
    console.log("saved new song", newSong)
  }

  useEffect(() => {
    const result = results[resultIndex]
    if (!result) return
    setNewSong({
      artist: result.artists[0].name,
      artistId: result.artists[0].id,
      album: result.album.name,
      title: result.name,
      albumArtwork: result.album.images[0].url,
      releaseDate: result.album.release_date,
      votes: 0,
      visible: true
    })
  }, [results, resultIndex])

  return (
    <div style={styles.newSongContainer}>
      <div style={styles.closeButton}>
        <Button onClick={toggleIsEditing}>X</Button>
      </div>
      <form onSubmit={searchSong} style={styles.formStyles}>
        <input
          style={styles.inputStyles}
          type="text"
          placeholder={"Title"}
          onChange={e => setTitleQuery(e.target.value)}
          value={titleQuery || newSong.title}
        />
        <input
          style={styles.inputStyles}
          type="text"
          placeholder={"Artist (optional)"}
          onChange={e => setArtistQuery(e.target.value)}
          value={artistQuery || newSong.artist}
        />
        <input style={styles.inputStyles} value={newSong.album} />
        <div style={styles.findButtonContainer}>
          <Button type="submit">SEARCH</Button>
        </div>
      </form>
      {results.length > 0 && (
        <>
          <div style={styles.results}>
            <img
              height="250px"
              width="250px"
              src={newSong.albumArtwork}
              alt=""
            />
            <span style={styles.releaseDate}>
              {moment(newSong.releaseDate).format("MMMM Do, YYYY")}
            </span>
          </div>
          <div style={styles.buttonContainer}>
            <Button type="button" onClick={previousResult}>
              ←
            </Button>
            <Button onClick={saveSong}>Save</Button>
            <Button type="button" onClick={nextResult}>
              →
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  newSongContainer: {
    border: "2px solid white",
    borderRadius: "5px",
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "black",
    zIndex: "2",
    boxShadow: "rgba(0, 0, 0, 0.75) -1px 4px 20px 8px"
  },
  formStyles: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center"
  },
  inputStyles: {
    lineHeight: "1.8em",
    fontSize: "1.5em",
    textAlign: "center",
    border: "none",
    backgroundColor: "#3a3a3a",
    color: "#b3b3b3",
    margin: "1%",
    width: "45vw"
  },
  addSongStyles: {
    fontSize: "1em",
    borderRadius: "100em",
    padding: "2%",
    background: "#f8f8f8",
    color: "#333"
  },
  results: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center"
  },
  releaseDate: {
    color: "#b3b3b3"
  },
  disabled: {
    opacity: 0.5
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  findButtonContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "85vw"
  },
  closeButton: {
    display: "flex",
    justifyContent: "flex-end"
  }
}
