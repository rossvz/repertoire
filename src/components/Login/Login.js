import React from 'react'
import { Redirect } from 'react-router'

const loginStyles = {
  formStyles: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    padding: '5%'
  },
  inputStyles: {
    lineHeight: '1.8em',
    fontSize: '1.5em',
    textAlign: 'center',
    border: 'none',
    backgroundColor: '#f8f8f8',
    margin: '1%',
    width: '90vw'
  }
}

const Login = (props) => {
  const onSubmit = e => {
    e.preventDefault()
    const credentials = {
      email: props.authentication.email,
      password: props.authentication.password
    }
    props.firebase.login(credentials)
      .then(res => localStorage.setItem('uid', res.user.uid))
      .catch(err => console.error(err))
  }

  const renderLogin = () => {
    if (props.firebase.auth().currentUser) return <div>Authenticated!!
      <Redirect to="/" /></div>
    else return loginForm()
  }

  const loginForm = () => {
    return (
      <form style={loginStyles.formStyles} onSubmit={e => onSubmit(e)} autocomplete="off">
        <input style={loginStyles.inputStyles}
               type="email"
               value={props.authentication.email}
               onChange={e => props.emailChanged(e.target.value)}
               placeholder="user@gmail.com" />
        <input style={loginStyles.inputStyles}
               type="password" value={props.authentication.password}
               onChange={e => props.passwordChanged(e.target.value)}
               placeholder="********" />
        <button type="submit">Login</button>
      </form>
    )
  }

  return (
    <div>
      {renderLogin()}
    </div>
  )
}

export default Login
