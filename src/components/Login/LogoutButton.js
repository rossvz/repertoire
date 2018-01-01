import React from 'react'
import FontAwesome from 'react-fontawesome'
import history from 'util/history'

const logout = (firebase) => {
  firebase.logout()
  window.location.reload(true)
  history.push('/')
}
const LogoutButton = ({firebase}) => <div style={styles.buttonStyles} onClick={() => {logout(firebase)}}>
  <FontAwesome name={'sign-out-alt'} />
  <span>Log Out</span>
</div>

const styles = {
  buttonStyles: {
    flex: 1,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    fontSize: '1em',
    color: '#FC1F49',
    textDecoration: 'none'
  }
}

export default LogoutButton
