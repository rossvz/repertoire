import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'store'
import 'typeface-roboto'
import './App.css'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SongPage from './components/SongPage'
import Login from './components/Login'

const App = () =>
  <ReduxProvider store={ store }>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <hr />
        <Route exact path="/" component={SongPage} />
        <Route path="/login" component={Login} />
      </div>
    </Router>

  </ReduxProvider>

export default App
