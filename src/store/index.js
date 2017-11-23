import { applyMiddleware, createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import logger from 'redux-logger'
import firebase from 'store/Firebase'
import reducers from './reducers'


const createStoreWithMiddlewares = compose(
  reactReduxFirebase(firebase),
  applyMiddleware(logger),
)(createStore)

export default createStoreWithMiddlewares(reducers)
