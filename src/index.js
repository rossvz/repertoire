import React from "react"
import { createRoot } from "react-dom"
import { FirebaseAppProvider } from "reactfire"
import "./index.css"

import App from "./App"
const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: "rg-music.firebaseapp.com",
  databaseURL: "https://rg-music.firebaseio.com",
  projectId: "rg-music",
  storageBucket: "rg-music.appspot.com",
  appId: "390024634944",
  messagingSenderId: "390024634944",
  preserveOnLogout: { data: ["songs"] },
  preserveOnEmptyAuthChange: { data: ["songs"] },
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
)
