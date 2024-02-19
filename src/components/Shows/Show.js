import React from "react"
import { DeleteShow } from "./DeleteShow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faMap } from "@fortawesome/free-solid-svg-icons"

export const Show = ({ show }) => (
  <div style={styles.card}>
    <div style={styles.header}>
      <h3>{show._date}</h3>
      <DeleteShow show={show} />
    </div>
    <div style={styles.content}>
      <div style={styles.info}>
        <FontAwesomeIcon icon={faMap} />
        <span style={{ marginLeft: "10px" }}>{show.venue}</span>
      </div>
      <div style={styles.info}>
        <FontAwesomeIcon icon={faClock} />
        <span style={{ marginLeft: "10px" }}>{show.time}</span>
      </div>
      <a style={styles.location} href={show._location} target={"_blank"}>
        Get Directions
      </a>
    </div>
  </div>
)

const styles = {
  card: {
    background: "#f8f8f8",
    width: "80%",
    borderBottom: "2px solid white",
    padding: "3%",
    margin: "2% 0",
    borderRadius: "5px",
    boxShadow: "10px 10px 5px 0 rgba(0,0,0,0.75)",
  },
  info: {
    display: "flex",
    padding: "5px",
  },

  location: {},
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
}
