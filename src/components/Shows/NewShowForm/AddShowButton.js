import React from 'react'
import FontAwesome from 'react-fontawesome'
import Button from 'components/common/Button'

const AddShowButton = ({toggleEditingNewShow}) => {
  return (
    <Button onClick={toggleEditingNewShow}>
      <FontAwesome style={styles.icon} name={'plus-circle'} />
      ADD SHOW
    </Button>)
}

const styles = {
  icon: {
    marginRight: '10px'
  },
}

export default AddShowButton
