import React from 'react'
import LoginButton from '../Login/LoginButton'
import HomeButton from './HomeButton'
import AboutButton from './AboutButton'
import ShowsButton from './ShowsButton'

const Footer = ({firebase}) => {
  return (
    <div style={styles.footer}>
      <HomeButton />
      <ShowsButton />
      <AboutButton />
      <LoginButton firebase={firebase} />

    </div>
  )
}

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    height: '8vh',
    width: '100%',
    background: '#333',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default Footer
