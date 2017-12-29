import React from 'react'

const styles = {
  resetButton: {
    cursor: 'pointer',
  }
}

const ResetVotes = ({ resetVotes }) =>
  <div
    style={styles.resetButton }
    onClick={ resetVotes }
  >
    Reset votes
  </div>


export default ResetVotes
