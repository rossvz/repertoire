import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import newSong from './newSong/reducer'
import setlist from './setlist/reducer'
import songs from './songs/reducer'

export default combineReducers({
  firebase: firebaseReducer,
  newSong,
  songs,
  setlist
})
