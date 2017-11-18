import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBuh0w14McaZOdHA3S6xtLKQcpGj_AvhEU',
  authDomain: 'rg-music.firebaseapp.com',
  databaseURL: 'https://rg-music.firebaseio.com',
  projectId: 'rg-music',
  storageBucket: 'rg-music.appspot.com',
  messagingSenderId: '390024634944'
}
const Firebase = firebase.initializeApp(config)

export default Firebase
