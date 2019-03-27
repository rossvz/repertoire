import React from "react";
import FontAwesome from "react-fontawesome";

const Visibility = ({ visible = true, toggleVisible }) => (
  <div style={styles.visibilityButton} onClick={toggleVisible}>
    <FontAwesome name={visible ? "eye-slash" : "eye"} style={styles.icon} />
  </div>
);

const styles = {
  icon: {
    marginRight: "10px"
  },
  visibilityButton: {
    cursor: "pointer",
    marginBottom: "10px"
  }
};

export default Visibility;
