import React from "react";
import PropTypes from "prop-types";
import NewSongForm from "./NewSongForm/index";
import FontAwesome from "react-fontawesome";
import Button from "components/common/Button";
import { isLoaded, isEmpty } from "react-redux-firebase";

const styles = {
  container: {
    marginTop: 20,
    textAlign: "center"
  },
  icon: {
    marginRight: "10px"
  }
};

const NewSong = ({ isEditing, toggleIsEditing, auth }) =>
  !isEmpty(auth) ? (
    <div style={styles.container}>
      {isEditing ? (
        <NewSongForm toggleIsEditing={toggleIsEditing} />
      ) : (
        <Button
          onClick={() => {
            window.scrollTo(0, 0);
            toggleIsEditing();
          }}
        >
          <FontAwesome style={styles.icon} name={"plus-circle"} />
          ADD SONG
        </Button>
      )}
    </div>
  ) : (
    <div />
  );

NewSong.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
};

export default NewSong;
