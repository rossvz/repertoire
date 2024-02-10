import React from "react"
import Upvote from "./Upvote"
import AlbumArtwork from "./AlbumArtwork"
import { AdminFunctions } from "./AdminFunctions"
import { isUpvoted } from "../../../../util/votes"
import { toggleVoteInStorage } from "../../../../util/votes"
import { ref, remove, update } from "firebase/database"
import { useDatabase } from "reactfire"
const Song = ({ song, signedIn }) => {
  const database = useDatabase()
  const songRef = ref(database, `songs/${song.id}`)

  const changeVote = (value) => {
    const votes = song.votes < 0 || value === "reset" ? 0 : song.votes + value
    update(songRef, { votes })
    toggleVoteInStorage(song.id)
  }

  const toggleVisible = () => {
    update(songRef, { visible: !song.visible })
  }
  const deleteSong = () => {
    remove(songRef)
  }

  if (!signedIn && !song.visible) return <div />
  return (
    <div style={setStyles(song)}>
      <div style={styles.columnStyles}>
        <AlbumArtwork albumArtwork={song.albumArtwork} />
        <div style={styles.songInfoStyles}>
          <div style={styles.title}>{song.title}</div>

          <div style={styles.artist}>{song.artist}</div>
          <div style={styles.album}>{song.album}</div>
        </div>
        <div style={styles.actionStyles}>
          <Upvote changeVote={changeVote} upvoted={isUpvoted(song.id)} />
          <p style={styles.voteCount}>{song.votes}</p>
        </div>
      </div>
      {signedIn ? (
        <AdminFunctions
          song={song}
          changeVote={changeVote}
          toggleVisible={toggleVisible}
          deleteSong={deleteSong}
        />
      ) : null}
    </div>
  )
}

const setStyles = (song) =>
  song.visible ? styles.songStyles : styles.invisibleSongStyles

const styles = {
  songStyles: {
    width: "100%",
    margin: "10px 20px",
    backgroundSize: "cover",
    paddingTop: "10px",
    borderTop: "2px solid rgb(84 78 88 / 47%)",
    color: "#fff",
  },
  invisibleSongStyles: {
    opacity: 0.4,
    width: "100%",
    margin: "10px 20px",
    backgroundSize: "cover",
    paddingTop: "10px",
    borderTop: "2px solid rgb(84 78 88 / 47%)",
    color: "#fff",
  },
  columnStyles: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  actionStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
    opacity: 0.5,
    color: "#fff",
    height: "80px",
  },
  songInfoStyles: {
    padding: "0 20px",
    flex: 3,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    minHeight: "80px",
  },

  title: {
    fontWeight: "bold",
    fontSize: "1.2em",
    letterSpacing: "0.1em",
    // textAlign: "center",
    marginBottom: "10px",
  },
  artist: {
    color: "#B4CBEA",
    fontSize: "1em",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    // padding: "1em 0",
  },
  album: {
    fontStyle: "italic",
    // fontSize: "smaller",
    opacity: 0.7,
  },
  genres: {
    fontSize: "smaller",
    opacity: 0.5,
    marginTop: "2em ",
  },
  row: {
    marginBottom: 10,
  },
  voteCount: {
    fontSize: "0.7em",
    color: "#B4CBEA",
    fontWeight: "bold",
  },
}

export default Song
