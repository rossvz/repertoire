import React from 'react'

const Header = ({title}) => {
  return (
    <div style={styles.headerStyles}>{title}</div>
  )
}

const styles = {
  headerStyles: {
    width: '100%',
    height: '8vh',
    background: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0px 10px black',
    fontSize: '1.4em'
  }
}

export default Header
