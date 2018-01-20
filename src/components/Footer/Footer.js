import React from 'react'
import LoginButton from './LoginButton'
import HomeButton from './HomeButton'
import ShowsButton from './ShowsButton'

const Footer = () => {
  return (
    <div style={styles.footer}>
      <HomeButton />
      <ShowsButton />
      {/*<AboutButton />*/}
      <LoginButton />

    </div>
  )
}

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    height: '8vh',
    width: '100%',
    background: 'rgb(56, 55, 64)',
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default Footer
