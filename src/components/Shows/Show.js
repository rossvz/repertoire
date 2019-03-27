import React from "react";
import { DeleteShow } from "./DeleteShow";
import { withFirebase } from "react-redux-firebase";
import { withHandlers } from "recompose";
import { deleteShow } from "../../store/shows/actions";
import { compose } from "redux";
const Show = ({ show, deleteShow }) => (
  <div style={styles.card}>
    <div style={styles.header}>
      <h2>{show._date}</h2>
      <DeleteShow deleteShow={deleteShow} />
    </div>
    <div style={styles.content}>
      <h3>{show.time}</h3>
      <h3>{show.venue}</h3>
      <a style={styles.location} href={show._location} target={"_blank"}>
        Get Directions
      </a>
    </div>
  </div>
);

const styles = {
  card: {
    background: "#f8f8f8",
    width: "75%",
    borderBottom: "2px solid white",
    padding: "5%",
    margin: "3% 0",
    borderRadius: "5px",
    boxShadow: "10px 10px 5px 0 rgba(0,0,0,0.75)"
  },
  location: {},
  header: {
    display: "flex",
    justifyContent: "space-between"
  }
};

export default compose(
  withFirebase,
  withHandlers({
    deleteShow
  })
)(Show);
