import React from 'react'
import Header from '../Header/Header'

const About = props => {
  return (
    <div style={styles.aboutContainer}>
      <Header title={'About Me'} />

      <h2>Randy Godwin</h2>
      <div>
        <p>From the bottom of the page, press "Songs" to view the song list I will be playing from -or- press "Shows" to view my upcoming events.  If you are listening live, I invite you to vote for your favorite songs by pressing the "like" image next to the song.  Throughout the show, I will play the most popular song requests.</p>
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
