import { getAuth } from "firebase/auth"
import React from "react"
import { AuthProvider, useFirebaseApp } from "reactfire"
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom"

import "fontsource-roboto/latin.css"
import "./App.css"

import About from "./components/About/About"
import { AdminPage } from "./components/Admin/AdminPage"
import Footer from "./components/Footer/Footer"
import { ShowsPage } from "./components/Shows/ShowsPage"
import Song from "./components/SongPage/SongList/Song/Song"
import { SongListPage } from "./components/SongPage/SongPage"

const App = () => {
  const firebaseApp = useFirebaseApp()
  const auth = getAuth(firebaseApp)
  return (
    <AuthProvider sdk={auth}>
      <BrowserRouter>
        <div className="App" style={responsiveStyles}>
          <Routes>
            <Route exact path="/" element={<SongListPage />} />
            <Route path="/about" element={<About />} />
            <Route exact path="/shows" element={<ShowsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
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
