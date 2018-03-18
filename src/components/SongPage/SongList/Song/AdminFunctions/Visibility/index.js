import React from 'react'
import FontAwesome from 'react-fontawesome'

const Visibility = ({ visible = true, changeVisible }) => (
  <div style={styles.visibilityButton} onClick={() => changeVisible(!visible)}>
    <FontAwesome name={visible ? 'eye-slash' : 'eye'} style={styles.icon} />
  </div>
)

const styles = {
  icon: {
    marginRight: '10px'
  },
  visibilityButton: {
    cursor: 'pointer',
    marginBottom: '10px'
  }
}

export default Visibility
