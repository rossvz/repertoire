import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const FooterButton = ({ route, icon, title }) => {
  return (
    <Link to={route} style={styles.buttonContainer}>
      <FontAwesomeIcon icon={icon} />
      <span>{title}</span>
    </Link>
  )
}

const styles = {
  buttonContainer: {
    textDecoration: "none",
    flex: 1,
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0 5%",
    fontSize: "1em",
    color: "#FC1F49",
    height: "90%",
  },
}

export default FooterButton
