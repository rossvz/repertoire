import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import styles from './styles'
import { connectIsAuthenticated } from '../../util/connectIsAuthenticated'

const routeIfAuth = isAuthenticated =>
  isAuthenticated
    ? '/admin'
    : '/login'

const LoginButton = ({ isAuthenticated }) =>
  <Link style={styles.buttonContainer} to={routeIfAuth(isAuthenticated)}>
    <FontAwesome name={'cogs'} />
    <span>Settings</span>
  </Link>

export default connectIsAuthenticated(LoginButton)
