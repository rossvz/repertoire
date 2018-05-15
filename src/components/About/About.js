import React from 'react'
import Header from '../Header/Header'

const About = props => {
  return (
    <div style={styles.aboutContainer}>
      <Header title={'About Me'} />
      <h2>Randy Godwin</h2>
      <div>
        <p>I am a singer & guitar player in the Atlanta Georgia area where I perform acoustic covers at local restaurants and private events.  Thank you for using this app!  I hope it will be a fun way for us to interact during our time together.  Grab some food, pull up a chair, and let's sing some songs.</p>
      </div>
    </div>
  )
}

const styles = {
  aboutContainer: {
    color: 'white',
    marginLeft: '5vh',
    marginRight: '5vh',
    textAlign: 'justify'
  },
  image: {
    width: '100%',
    height: 'auto'
  }
}

export default About
