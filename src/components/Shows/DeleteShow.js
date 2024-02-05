import Button from "../common/Button"
import FontAwesome from "react-fontawesome"
import React from "react"
import { useDeleteShow } from "./useDeleteShow"

import { useSigninCheck } from "reactfire"
export const DeleteShow = ({ show }) => {
  const deleteShow = useDeleteShow(show)

  const { data: user } = useSigninCheck()

  if (!user || !user.signedIn) return null
  return (
    <div style={styles.deleteShow}>
      <Button onClick={deleteShow}>
        <FontAwesome name={"trash"} />
      </Button>
    </div>
  )
}

const styles = {
  deleteShow: {
    maxWidth: "20%"
  }
}
