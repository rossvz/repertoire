import React from "react"
import { withFirebase, isEmpty, isLoaded } from "react-redux-firebase"
import { connect } from "react-redux"
import { compose } from "redux"
const showIfAuthenticated = DecoratedComponent => {
  const OnlyShowIfAuthenticated = ({
    auth,
    unauthenticatedComponent,
    ...otherProps
  }) => {
    return isLoaded(auth) && !isEmpty(auth) ? (
      <DecoratedComponent {...otherProps} />
    ) : (
      <div />
    )
  }

  return compose(
    withFirebase,
    connect(mapStateToProps)
  )(OnlyShowIfAuthenticated)
}

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
})
export default showIfAuthenticated
