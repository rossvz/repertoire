import React from 'react'
import FontAwesome from 'react-fontawesome'

const styles = {
  icon: {
    marginRight: '10px'
  },
  resetButton: {
    cursor: 'pointer',
    marginBottom: '10px'
  }
}

const ResetVotes = ({ resetVotes }) => (
  <div style={styles.resetButton} onClick={resetVotes}>
    <div>
      <FontAwesome name={'undo'} style={styles.icon} />
    </div>
  </div>
)

export default ResetVotes
