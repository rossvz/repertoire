import React from 'react'

const styles = {
  resetButton: {
    cursor: 'pointer',
    marginBottom: '10px'
  }
}

const ResetVotes = ({resetVotes}) =>
  <div
    style={styles.resetButton}
    onClick={resetVotes}
  >
    Reset
  </div>

export default ResetVotes
