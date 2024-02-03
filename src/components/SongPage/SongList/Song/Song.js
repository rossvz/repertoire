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

  const changeVote = value => {
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
          <div>{song.album}</div>
          {signedIn ? (
            <AdminFunctions
              song={song}
              changeVote={changeVote}
              toggleVisible={toggleVisible}
              deleteSong={deleteSong}
            />
          ) : null}
        </div>
        <div style={styles.actionStyles}>
          <Upvote changeVote={changeVote} upvoted={isUpvoted(song.id)} />
          <p>{song.votes}</p>
        </div>
      </div>
    </div>
  )
}

const setStyles = song =>
  song.visible ? styles.songStyles : styles.invisibleSongStyles

const styles = {
  songStyles: {
    width: "100%",
    margin: "2% 20%",
    // boxShadow: '#d8d8d8 3px 5px 10px',
    backgroundSize: "cover",
    paddingBottom: "3%",
    borderBottom: "2px solid #544E58"
    // background: 'linear-gradient(135deg, rgba(136, 17, 204, 0.4), rgba(17, 136, 204, 0.4)) fixed'
  },
  invisibleSongStyles: {
    opacity: 0.4,
    width: "100%",
    margin: "2% 20%",
    // boxShadow: '#d8d8d8 3px 5px 10px',
    backgroundSize: "cover"
    // background: 'linear-gradient(135deg, rgba(136, 17, 204, 0.4), rgba(17, 136, 204, 0.4)) fixed'
  },
  columnStyles: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  },
  actionStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    opacity: 0.5,
    color: "#fff"
  },
  songInfoStyles: {
    padding: "0 5%",
    flex: 3,
    color: "#fff"
  },

  title: {
    fontWeight: "bold",
    fontSize: "1.3em",
    letterSpacing: "0.1em"
    // textTransform: 'uppercase'
  },
  artist: {
    color: "#B4CBEA",
    fontSize: "1em",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    padding: "5% 0"
  },
  genres: {
    fontSize: "smaller",
    opacity: 0.5,
    marginTop: "2em "
  },
  row: {
    marginBottom: 10
  }
}

export default Song
