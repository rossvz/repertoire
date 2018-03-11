import React from 'react'

const styles = {
  buttonStyles:{
    fontSize: '1em',
    padding: '2%',
    borderRadius: '100em',
    background: '#f8f8f8',
    color: '#333'
  },
}

const Button = props => (
  <button style={styles.buttonStyles} onClick={props.onClick} {...props}>{props.children}</button>
)

export default Button