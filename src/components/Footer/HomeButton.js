import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import styles from './styles'

const HomeButton = (props) => {
  return (
    <Link to={'/'} style={styles.buttonContainer}>
      <FontAwesome name={'music'} />
      <span>Songs</span>
    </Link>
  )
}
export default HomeButton
