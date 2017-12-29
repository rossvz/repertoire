import React from 'react'

const Header = ({title}) => {
  return (
    <div style={styles.headerStyles} className="Header-container">
      <div>{title}</div>
    </div>
  )
}

const styles = {
  headerStyles: {
    width: '100%',
    height: '8vh',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // boxShadow: '0 0px 10px black',
    fontSize: '1.5em',
    color: '#B4CBEA',
    fontWeight: 'bold'

  }
}

export default Header
