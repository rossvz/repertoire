import { EMAIL_CHANGED, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, PASSWORD_CHANGED } from './types'

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {...state, email: action.payload}
    case PASSWORD_CHANGED:
      return {...state, password: action.payload}
    case LOGIN_USER:
      return {...state, loading: true}
    case LOGIN_USER_SUCCESS:
      console.log(action.payload)
      return {...state, ...INITIAL_STATE, user: action.payload}
    case LOGIN_USER_FAIL:
      return {...state, user: null, error: 'Authentication Failed', loading: false}
    default:
      return state
  }
}
