import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import "typeface-roboto";
import "./App.css";

import { Router, Route } from "react-router-dom";
import history from "util/history";
import SongPage from "./components/SongPage";
import Login from "./components/Login";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Shows from "./components/Shows";
import Admin from "./components/Admin";

import createReduxStore from "store";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBuh0w14McaZOdHA3S6xtLKQcpGj_AvhEU",
  authDomain: "rg-music.firebaseapp.com",
  databaseURL: "https://rg-music.firebaseio.com",
  projectId: "rg-music",
  storageBucket: "rg-music.appspot.com",
  messagingSenderId: "390024634944",
  perserveOnLogout: ["songs"]
};

const reactReduxFirebaseConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  firebaseStateName: "firebase"
};

firebase.initializeApp(firebaseConfig);
const store = createReduxStore();

const reactReduxFirebaseProps = {
  firebase,
  config: reactReduxFirebaseConfig,
  dispatch: store.dispatch
};

const App = () => (
  <ReduxProvider store={store}>
    <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
      <Router history={history}>
        <div className="App" style={responsiveStyles}>
          <Route exact path="/" component={SongPage} />
          <Route exact path="/shows" component={Shows} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
          <Footer />
        </div>
      </Router>
    </ReactReduxFirebaseProvider>
  </ReduxProvider>
);

const styles = {
  app: {
    marginLeft: "20vw",
    marginRight: "20vw",
    boxShadow: "0px 2px 19px 8px black"
  }
};

const responsiveStyles = window.innerWidth > 700 ? styles.app : {};

export default App;
