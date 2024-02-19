import Button from "../common/Button"
import React from "react"
import { useDeleteShow } from "./useDeleteShow"

import { useSigninCheck } from "reactfire"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
export const DeleteShow = ({ show }) => {
  const deleteShow = useDeleteShow(show)

  const { data: user } = useSigninCheck()

  if (!user || !user.signedIn) return null
  return (
    <div style={styles.deleteShow}>
      <Button onClick={deleteShow}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  )
}

const styles = {
  deleteShow: {
    maxWidth: "20%",
  },
}
