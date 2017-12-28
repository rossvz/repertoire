import React from 'react'

const Visibility = ({visible = true, changeVisible, firebase}) => {
  if (firebase.auth().currentUser) {
    if (!visible) return <div style={styles.isHidden} onClick={() => {changeVisible(true)}}>Show</div>
    return <div onClick={() => {changeVisible(false)}}>Hide</div>
  }
  return <div></div>

}

const styles = {
  isVisible: {},
  isHidden: {
    pointerEvents: 'auto',
  }
}

export default Visibility
