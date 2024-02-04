import React from "react"

const AlbumArtwork = ({ albumArtwork }) => {
  if (!albumArtwork) return <div style={styles.placeholder} />
  return <img style={styles.image} src={albumArtwork} alt={"albumArtwork"} />
}

const styles = {
  placeholder: {
    width: "25vw",
    height: "25vw",
    backgroundColor: "gray"
  },
  image: {
    width: "10vh",
    maxWidth: "200px",
    borderRadius: "10px"
  }
}

export default AlbumArtwork
