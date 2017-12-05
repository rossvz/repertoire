import firebase from 'firebase'
import { EMAIL_CHANGED, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, PASSWORD_CHANGED } from './types'

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({email, password}) => {
  console.log('email password', email, password)
  return (dispatch) => {
    dispatch({type: LOGIN_USER})
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(user, dispatch))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(user, dispatch))
          .catch(err => loginUserFail(dispatch))
      })
  }
}

const loginUserFail = dispatch => dispatch({type: LOGIN_USER_FAIL})

const loginUserSuccess = (user, dispatch) => {
  dispatch({type: LOGIN_USER_SUCCESS, payload: user})
}
