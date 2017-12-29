import React from 'react'

const HelperText = (props) => {
  return (
    <div style={styles.text}>Hit the "like" button on any song to vote for it. Songs with higher votes are more likely to get played!</div>
  )
}

const styles = {
  text: {
    color: 'white',
    padding: '5%',
    fontSize: '1.2em'
  }
}

export default HelperText
