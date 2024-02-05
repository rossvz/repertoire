import React from "react"
import FontAwesome from "react-fontawesome"

export const LogoutButton = ({ logout }) => (
  <div style={styles.buttonStyles} onClick={logout}>
    <FontAwesome name={"sign-out-alt"} />
    <span>Log Out</span>
  </div>
)

const styles = {
  buttonStyles: {
    flex: 1,
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    fontSize: "1em",
    color: "#FC1F49",
    textDecoration: "none",
    position: "fixed",
    top: 0,
    right: 0,
  },
}

// export default compose(
//   withFirebase,
//   withHandlers({
//     logout: props => evt => {
//       setTimeout(() => {
//         history.replace("/login");
//       }, 500);
//       props.firebase.logout();
//     }
//   })
// )(LogoutButton);
