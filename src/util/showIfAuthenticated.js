import React from "react";
import { withFirebase, isEmpty, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
const showIfAuthenticated = DecoratedComponent => {
  const OnlyShowIfAuthenticated = ({ auth, ...otherProps }) => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      return <DecoratedComponent {...otherProps} />;
    }

    return <div />;
  };

  return compose(
    withFirebase,
    connect(mapStateToProps)
  )(OnlyShowIfAuthenticated);
};

const mapStateToProps = ({ firebase: { auth } }) => ({
  auth
});
export default showIfAuthenticated;
