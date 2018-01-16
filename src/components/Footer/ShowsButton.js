import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'
import styles from './styles'

const ShowsButton = (props) => {
  return (
    <Link to={'/shows'} style={styles.buttonContainer}>
      <FontAwesome name={'calendar-alt'} />
      <span>Shows</span>
    </Link>
  )
}

export default ShowsButton
