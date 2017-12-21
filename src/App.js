import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'store'
import 'typeface-roboto'
import './App.css'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SongPage from './components/SongPage'
import Login from './components/Login'

const LoginButton = ({firebase}) => {
  if (firebase.auth().currentUser) return <div></div>
  else return <ul>
    <li><Link to="/login">Login</Link></li>
  </ul>
}


const App = () =>
  <ReduxProvider store={ store }>
    <Router>
      <div>
        <Route exact path="/" component={SongPage} />
        <Route path="/login" component={Login} />
        <LoginButton firebase={store.firebase} />
      </div>
    </Router>

  </ReduxProvider>

export default App
