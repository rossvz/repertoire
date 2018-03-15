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

const App = () => (
  <ReduxProvider store={store}>
    <Router history={history}>
      <div className="App" style={responsiveStyles()}>
        <Route exact path="/" component={SongPage} />
        <Route exact path="/shows" component={Shows} />
        <Route path="/login" component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  </ReduxProvider>
)

const responsiveStyles = () => (window.innerWidth > 700 ? styles.app : {})

const styles = {
  app: {
    marginLeft: '20vw',
    marginRight: '20vw',
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
    boxShadow: '0px 2px 19px 8px black'
  }
}

export default App
