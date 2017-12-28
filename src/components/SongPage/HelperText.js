import React from 'react'

const HelperText = (props) => {
  return (
    <div style={styles.text}>Hit the "like" button on any song to vote for it. Songs with higher votes are more likely to get played!</div>
  )
}

const styles = {
  text: {
    padding: '5%'
  }
}

export default HelperText
