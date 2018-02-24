import React from 'react'
import Header from '../Header/Header'


const About = (props) => {
  return (
    <div style={styles.aboutContainer}>
      <Header title={'About Me'} />
      <h2>Randy Godwin</h2>
      <div>asdfasdf</div>
    </div>
  )
}

const styles = {
  aboutContainer: {
    color: 'white',
    // display: 'flex'
  },
  image: {
    width: '100%',
    height: 'auto',
  },

}

export default About
