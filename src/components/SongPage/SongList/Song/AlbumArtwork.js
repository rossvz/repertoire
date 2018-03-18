import React from 'react'

const AlbumArtwork = ({ albumArtwork }) => {
  if (!albumArtwork) return <div style={styles.placeholder} />
  return <img style={styles.image} src={albumArtwork} alt={'albumArtwork'} />
}

const styles = {
  placeholder: {
    width: '25vw',
    height: '25vw',
    backgroundColor: 'gray'
  },
  image: {
    width: '18vw',
    maxWidth: '200px'
  }
}

export default AlbumArtwork
