import React from "react"

export const HelperText = (props) => {
  return (
    <div style={styles.text}>
      Hit the "like" button on any song to vote for it. Songs with higher votes
      are more likely to get played! Use the search feature to find a song by
      title, artist, or album.
    </div>
  )
}

const styles = {
  text: {
    color: "white",
    padding: "5px 10px",
    fontSize: "16px",
    opacity: 0.7,
  },
}
