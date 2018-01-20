import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'

const AboutButton = (props) => {
  return (
    <Link to={'/about'} style={styles.buttonContainer}>
      <FontAwesome name={'user-circle'} />
      <span>About</span>
    </Link>
  )
}

const styles = {
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5%',
    fontSize: '1em',
    color: '#FC1F49',
    textDecoration: 'none'

  }
}

export default AboutButton
