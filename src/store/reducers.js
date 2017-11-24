import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import newSong from './newSong/reducer'
import songs from './songs/reducer'

export default combineReducers({
  firebase: firebaseReducer,
  newSong,
  songs,
})
