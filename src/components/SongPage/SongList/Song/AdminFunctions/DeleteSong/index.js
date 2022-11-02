import React from "react";
import FontAwesome from "react-fontawesome";

const styles = {
  icon: {
    marginRight: "10px"
  },
  resetButton: {
    cursor: "pointer",
    marginBottom: "10px"
  }
};

const DeleteSong = ({ deleteSong }) => {
  return (
    <div style={styles.resetButton} onClick={() => deleteSong()}>
      <div>
        <FontAwesome name={"trash"} style={styles.icon} />
      </div>
    </div>
  );
};

export default DeleteSong;
