import React from 'react'
import { firebaseConnect } from 'react-redux-firebase'

const showIfAuthenticated = DecoratedComponent => {
  const OnlyShowIfAuthenticated = ({ firebase, ...otherProps }) => {
    if (firebase.auth().currentUser) {
      return <DecoratedComponent { ...otherProps } />
    }

    return <div />
  }

  return firebaseConnect([
    'auth'
  ])(OnlyShowIfAuthenticated)
}

export default showIfAuthenticated
