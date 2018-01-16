import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'store'
import 'typeface-roboto'
import './App.css'

import { Router, Route } from 'react-router-dom'
import history from 'util/history'
import SongPage from './components/SongPage'
import Login from './components/Login'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import Shows from './components/Shows'
import Admin from './components/Admin'

const App = () =>
  <ReduxProvider store={store}>
    <Router history={history}>
      <div className="App">
        <Route exact path="/" component={SongPage} />
        <Route exact path="/shows" component={Shows} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/about" component={About} />
        <Footer firebase={store.firebase} />
      </div>
    </Router>

  </ReduxProvider>

export default App
