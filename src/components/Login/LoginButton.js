import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

const LoginButton = ({firebase}) => {
  if (firebase.auth().currentUser) {
    return <Link style={styles.buttonStyles} to="/admin">
      <FontAwesome name={'cogs'} />
      <span>Admin</span>
    </Link>
  }
  else return <Link style={styles.buttonStyles} to="/login">
    <div style={styles.buttonStyles}>
      <FontAwesome name={'sign-in-alt'} />
      <span>Login</span>
    </div>
  </Link>
}

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

export default LoginButton
