import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import styles from './styles'

const routeIfAuth = firebase =>
  firebase.auth().currentUser
    ? '/admin'
    : '/login'

const LoginButton = ({firebase}) =>
  <Link style={styles.buttonContainer} to={routeIfAuth(firebase)}>
    <FontAwesome name={'cogs'} />
    <span>Settings</span>
  </Link>


export default LoginButton
