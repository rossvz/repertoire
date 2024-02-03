import React from "react"
import { AuthProvider, useFirebaseApp, useInitPerformance } from "reactfire"
import { getAuth } from "firebase/auth"

import "typeface-roboto"
import "./App.css"

import { Router, Route } from "react-router-dom"
import history from "util/history"
import SongPage from "./components/SongPage/SongPage"
import Login from "./components/Login"
import About from "./components/About/About"
import Footer from "./components/Footer/Footer"
import Shows from "./components/Shows"
import Admin from "./components/Admin"
import { SongListPage } from "./components/SongPage/SongPage"

const App = () => {
  const firebaseApp = useFirebaseApp()
  const auth = getAuth(firebaseApp)
  useInitPerformance(async firebaseApp => {
    const { getPerformance } = await import("firebase/performance")
    return getPerformance(firebaseApp)
  })
  return (
    <AuthProvider sdk={auth}>
      <Router history={history}>
        <div className="App" style={responsiveStyles}>
          <Route exact path="/" component={SongListPage} />
          {/* <Route exact path="/shows" component={Shows} />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} /> */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

const styles = {
  app: {
    marginLeft: "20vw",
    marginRight: "20vw",
    boxShadow: "0px 2px 19px 8px black"
  }
}

const responsiveStyles = window.innerWidth > 700 ? styles.app : {}

export default App
