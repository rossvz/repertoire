import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import styles from './styles'

const AboutButton = (props) => {
  return (
    <Link to={'/about'} style={styles.buttonContainer}>
      <FontAwesome name={'user-circle'} />
      <span>About</span>
    </Link>
  )
}


export default AboutButton
