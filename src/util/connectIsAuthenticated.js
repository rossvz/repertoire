import { withProps, compose } from 'recompose'
import { firebaseConnect } from 'react-redux-firebase'

export const connectIsAuthenticated = compose( // from recompose
  firebaseConnect([
    'auth'
  ]),
  withProps( // from recompose
    props => ({ isAuthenticated: Boolean(props.firebase.auth().currentUser) })
  )
)
