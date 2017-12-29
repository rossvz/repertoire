import React from 'react'

const Visibility = ({visible = true, changeVisible}) =>
  <div
    style={styles.visibilityButton}
    onClick={() => changeVisible(!visible)}
  >
    {visible ? 'HIDE' : 'SHOW'}
  </div>

const styles = {
  visibilityButton: {
    cursor: 'pointer',
    marginBottom: '10px'
  },
}

export default Visibility
