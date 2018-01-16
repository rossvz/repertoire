import React from 'react'
import FontAwesome from 'react-fontawesome'

const AddShowButton = ({toggleEditingNewShow}) => {
  return (
    <button style={styles.addShowStyles} onClick={() => toggleEditingNewShow()}>
      <FontAwesome style={styles.icon} name={'plus-circle'} />
      ADD SHOW
    </button>)
}

const styles = {
  addShowStyles: {
    fontSize: '1em',
    borderRadius: '100em',
    padding: '2%',
    background: '#f8f8f8',
    color: '#333'
  },
  icon: {
    marginRight: '10px'
  },
}

export default AddShowButton
