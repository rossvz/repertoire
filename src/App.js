import React from "react"
import { AuthProvider, useFirebaseApp } from "reactfire"
import { getAuth } from "firebase/auth"

import "fontsource-roboto/latin.css"
import "./App.css"

import { BrowserRouter, Route, Switch } from "react-router-dom"
// import history from "./util/history"
import About from "./components/About/About"
import Footer from "./components/Footer/Footer"
import { ShowsPage } from "./components/Shows/ShowsPage"
import { SongListPage } from "./components/SongPage/SongPage"
import { AdminPage } from "./components/Admin/AdminPage"
import Song from "./components/SongPage/SongList/Song/Song"

const App = () => {
  const firebaseApp = useFirebaseApp()
  const auth = getAuth(firebaseApp)
  return (
    <AuthProvider sdk={auth}>
      <BrowserRouter>
        <div className="App" style={responsiveStyles}>
          <Switch>
            <Route exact path="/">
              <SongListPage />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route exact path="/shows">
              <ShowsPage />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

const styles = {
  app: {
    // marginLeft: "20vw",
    // marginRight: "20vw",
    boxShadow: "0px 2px 19px 8px black",
  },
}

const responsiveStyles = window.innerWidth > 700 ? styles.app : {}

export default App
