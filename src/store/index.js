import { applyMiddleware, createStore, compose } from 'redux'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import firebase from 'store/Firebase'
import reducers from './reducers'


const createStoreWithMiddlewares = compose(
  reactReduxFirebase(firebase),
  applyMiddleware(
    thunk.withExtraArgument(getFirebase),
    process.env.NODE_ENV === 'development' ? logger : x => x
  ),
)(createStore)

export default createStoreWithMiddlewares(reducers)
