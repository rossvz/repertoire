import React from 'react'
import { Redirect } from 'react-router'
import Button from 'components/common/Button'

const Login = (props) => {
  window.scrollTo(0, 0)
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
    if (props.firebase.auth().currentUser) return <div>Authenticated!!<Redirect to="/admin" /></div>
    else return loginForm()
  }

  const loginForm = () => {
    return (
      <div style={loginStyles.container}>
        <form style={loginStyles.formStyles} onSubmit={e => onSubmit(e)} autoComplete={'off'}>
          <input style={loginStyles.inputStyles}
                 type="email"
                 value={props.authentication.email}
                 onChange={e => props.emailChanged(e.target.value)}
                 placeholder="user@gmail.com" />
          <input style={loginStyles.inputStyles}
                 type="password" value={props.authentication.password}
                 onChange={e => props.passwordChanged(e.target.value)}
                 placeholder="********" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {renderLogin()}
    </div>
  )
}

const loginStyles = {
  container:{
    background: `url(https://source.unsplash.com/user/erondu)`,
    backgroundRepeat:'no-repeat',
    height:'100vh'
  },
  titleStyles: {
    color:'white',
  },
  formStyles: {
    marginTop: '20%',
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
    width: '90vw',
    borderRadius: '100em',
    opacity:'0.6'
  },
  submit: {
    width:'90vw',
    fontSize: '1.4em',
    color: 'white',
    padding: '3%',
    border: '2px solid white',
    backgroundColor: 'transparent',
    borderRadius: '100em'
  },
  backButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
  },
  backButton: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: 'white',
    margin: '3%'
  }
}

export default Login
