import React, { useEffect, useState } from "react"
import { useDatabase } from "reactfire"
import moment from "moment"
import { ref, set, push } from "firebase/database"

import { search } from "../../../util/Spotify"
import Button from "../../common/Button"

const INITIAL_SONG_STATE = {
  title: "",
  artist: "",
  artistUrl: "",
  album: "",
  votes: 0,
  visible: true,
}

export const NewSongForm = ({ toggleIsEditing }) => {
  const [searching, setSearching] = useState(false)
  const [titleQuery, setTitleQuery] = useState("")
  const [artistQuery, setArtistQuery] = useState("")
  const [results, setResults] = useState([])
  const [resultIndex, setResultIndex] = useState(0)
  const [newSong, setNewSong] = useState(INITIAL_SONG_STATE)

  const database = useDatabase()
  const songsRef = ref(database, "songs")

  const searchSong = (e) => {
    setSearching(true)
    e.preventDefault()
    search({ title: titleQuery, artist: artistQuery }).then((results) => {
      setResults(results.data.items)
      setTitleQuery("")
      setArtistQuery("")
      setResultIndex(0)
      setSearching(false)
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
    toggleIsEditing()
  }

  const resetSearch = () => {
    setResults([])
    setNewSong(INITIAL_SONG_STATE)
  }

  useEffect(() => {
    const result = results[resultIndex]
    if (!result) return
    setNewSong({
      artist: result.artists[0].name,
      artistId: result.artists[0].id,
      album: result.album.name,
      title: titleQuery || result.name,
      albumArtwork: result.album.images[0].url,
      releaseDate: result.album.release_date,
      votes: 0,
      visible: true,
    })
  }, [results, resultIndex, titleQuery])

  return (
    <div style={styles.backdrop}>
      <div style={styles.newSongContainer}>
        <div style={styles.closeButton}>
          <Button onClick={toggleIsEditing}>X</Button>
        </div>
        <form onSubmit={searchSong} style={styles.formStyles}>
          <input
            style={styles.inputStyles}
            type="text"
            placeholder={"Title"}
            onChange={(e) => {
              if (e.target.value === "") resetSearch()
              setTitleQuery(e.target.value)
            }}
            value={titleQuery || newSong.title}
          />
          <input
            style={styles.inputStyles}
            type="text"
            placeholder={"Artist (optional)"}
            onChange={(e) => setArtistQuery(e.target.value)}
            value={artistQuery || newSong.artist}
          />
          <input
            style={styles.inputStyles}
            value={newSong.album}
            onChange={(e) => {
              setNewSong({ ...newSong, album: e.target.value })
            }}
          />
          <div style={styles.findButtonContainer}>
            <Button type="button" onClick={resetSearch}>
              Clear
            </Button>
            <Button type="submit">Search</Button>
          </div>
        </form>
        <div style={styles.results}>
          <img
            height="200px"
            width="200px"
            src={newSong.albumArtwork}
            alt=""
            className={results.length === 0 ? "hide" : ""}
          />
          <span
            style={styles.releaseDate}
            className={results.length === 0 ? "hide" : ""}
          >
            {moment(newSong.releaseDate).format("MMMM Do, YYYY")}
          </span>
        </div>
        <div
          style={styles.buttonContainer}
          className={results.length === 0 ? "hide" : ""}
        >
          <Button type="button" onClick={previousResult}>
            ←
          </Button>
          <Button onClick={saveSong}>Save</Button>
          <Button type="button" onClick={nextResult}>
            →
          </Button>
        </div>

        <div className={!searching && "hide"} style={styles.searching}>
          Searching...
        </div>
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
  newSongContainer: {
    opacity: 1,
    border: "2px solid white",
    borderRadius: "5px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "black",
    zIndex: "2",
    boxShadow: "rgba(0, 0, 0, 0.75) -1px 4px 20px 8px",
    width: "95%",
  },
  formStyles: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  inputStyles: {
    lineHeight: "1.4em",
    fontSize: "1.2em",
    textAlign: "center",
    border: "none",
    backgroundColor: "#3a3a3a",
    color: "#b3b3b3",
    margin: "1%",
    width: "70vw",
  },
  addSongStyles: {
    fontSize: "1em",
    borderRadius: "100em",
    padding: "2%",
    background: "#f8f8f8",
    color: "#333",
  },
  results: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center",
  },
  releaseDate: {
    color: "#b3b3b3",
  },
  disabled: {
    opacity: 0.5,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  findButtonContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "85vw",
    margin: "2%",
  },
  closeButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  searching: {
    color: "white",
    textAlign: "center",
    fontSize: "2em",
  },
}
