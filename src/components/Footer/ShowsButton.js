import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'

const ShowsButton = (props) => {
  return (
    <Link to={'/shows'} style={styles.buttonContainer}>
      <FontAwesome name={'calendar-alt'} />
      <span>Shows</span>
    </Link>
  )
}

const styles = {
  buttonContainer: {
    textDecoration: 'none',
    flex: 1,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5%',
    fontSize: '1em',
    color: '#FC1F49'
  }
}

export default ShowsButton
