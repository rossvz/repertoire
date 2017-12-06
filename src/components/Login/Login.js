import React from 'react'

const Login = (props) => {
  const onSubmit = e => {
    e.preventDefault()
    const credentials = {
      email: props.authentication.email,
      password: props.authentication.password
    }
    props.firebase.login(credentials)
      .then(res => console.log('USER AUTHENTICATED!!', res))
      .catch(err => console.error(err))
  }

  return (
    <div>
      <form onSubmit={e => onSubmit(e)}>
        <input type="email" value={props.authentication.email} onChange={e => props.emailChanged(e.target.value)} />
        <input type="password" value={props.authentication.password} onChange={e => props.passwordChanged(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
