import React from "react"

const styles = {
  buttonStyles: {
    padding: "10px",
    borderRadius: "100em",
    background: "#383740",
    color: "#fc1f49",
    maxHeight: "3em",
    minWidth: "3em",
    border: "0",
    fontSize: "16px",
    cursor: "pointer",
  },
}

const Button = (props) => (
  <button style={styles.buttonStyles} {...props}>
    {props.children}
  </button>
)

export default Button
