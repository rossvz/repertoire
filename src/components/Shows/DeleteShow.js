import showIfAuthenticated from "../../util/showIfAuthenticated"
import Button from "../common/Button"
import FontAwesome from "react-fontawesome"
import React from "react"

export const DeleteShow = showIfAuthenticated(({ deleteShow }) => (
  <div style={styles.deleteShow}>
    <Button onClick={deleteShow}>
      <FontAwesome name={"trash"} />
    </Button>
  </div>
))

const styles = {
  deleteShow: {
    maxWidth: "20%"
  }
}
