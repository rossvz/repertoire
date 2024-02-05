import React from "react"
import { AuthProvider, useFirebaseApp } from "reactfire"
import { getAuth } from "firebase/auth"

import "fontsource-roboto/latin.css"
import "./App.css"

import { Router, Route } from "react-router-dom"
import history from "./util/history"
import About from "./components/About/About"
import Footer from "./components/Footer/Footer"
import { ShowsPage } from "./components/Shows/ShowsPage"
import { SongListPage } from "./components/SongPage/SongPage"
import { AdminPage } from "./components/Admin/AdminPage"

const App = () => {
  const firebaseApp = useFirebaseApp()
  const auth = getAuth(firebaseApp)
  return (
    <AuthProvider sdk={auth}>
      <Router history={history}>
        <div className="App" style={responsiveStyles}>
          <Route exact path="/" component={SongListPage} />
          <Route path="/about" component={About} />
          <Route exact path="/shows" component={ShowsPage} />
          <Route path="/admin" component={AdminPage} />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

const styles = {
  app: {
    // marginLeft: "20vw",
    // marginRight: "20vw",
    boxShadow: "0px 2px 19px 8px black"
  }
}

const responsiveStyles = window.innerWidth > 700 ? styles.app : {}

export default App
