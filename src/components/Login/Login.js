import React from 'react'

const Login = ({email, password, emailChanged, passwordChanged, loginUser}) => {
  const onSubmit = e => {
    e.preventDefault()
    debugger
    loginUser(email, password)
  }

  return (
    <div>
      <form onSubmit={e => onSubmit(e)}>
        <input type="email" value={email} onChange={e => emailChanged(e.target.value)} />
        <input type="password" value={password} onChange={e => passwordChanged(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
