import React from 'react'
import Header from '../Header/Header'

const About = props => {
  return (
    <div style={styles.aboutContainer}>
      <Header title={'About Me'} />

      <h2>Randy Godwin</h2>
      <div>
        <p>
          Thanks for visiting my page. From the bottom of the page, press the
          "Songs" or "Shows" button to view my current song list and upcoming
          shows. If you are listening live, feel free to select your favorite
          songs. Throughout the show, I will play the most popular songs
          requested.
        </p>
      </div>
    </div>
  )
}

const styles = {
  aboutContainer: {
    color: 'white',
    padding: '5%',
    textAlign: 'justify'
  },
  image: {
    width: '100%',
    height: 'auto'
  }
}

export default About
