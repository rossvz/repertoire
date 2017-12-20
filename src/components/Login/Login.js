import React from 'react'
import { Redirect } from 'react-router'

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
      <form onSubmit={e => onSubmit(e)}>
        <input type="email" value={props.authentication.email} onChange={e => props.emailChanged(e.target.value)} />
        <input type="password" value={props.authentication.password} onChange={e => props.passwordChanged(e.target.value)} />
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
