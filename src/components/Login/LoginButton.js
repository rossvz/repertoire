import React from 'react'
import { Link } from 'react-router-dom'

const logout = (firebase) => {
  firebase.logout()
  window.location.reload(true)
}
const LoginButton = ({firebase}) => {
  if (firebase.auth().currentUser) return <div style={styles.buttonStyles} onClick={() => logout(firebase)}>Logout</div>
  else return <Link style={{textDecoration: 'none'}} to="/login">
    <div style={styles.buttonStyles}>Login</div>
  </Link>
}

const styles = {
  buttonStyles: {display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5%', fontSize: '1.4em'}
}

export default LoginButton
