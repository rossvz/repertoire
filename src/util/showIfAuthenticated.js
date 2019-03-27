import React from "react";
import { withFirebase, isEmpty, isLoaded } from "react-redux-firebase";

const showIfAuthenticated = DecoratedComponent => {
  const OnlyShowIfAuthenticated = ({ firebase: { auth }, ...otherProps }) => {
    if (isLoaded(auth) && !isEmpty(auth)) {
      return <DecoratedComponent {...otherProps} />;
    }

    return <div />;
  };

  return withFirebase(OnlyShowIfAuthenticated);
};

export default showIfAuthenticated;
