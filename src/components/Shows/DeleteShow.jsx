import React from "react"
import styled from "styled-components"
import { useDeleteShow } from "./useDeleteShow"
import { useSigninCheck } from "reactfire"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const DeleteShow = ({ show }) => {
  const deleteShow = useDeleteShow(show)
  const { data: user } = useSigninCheck()

  if (!user || !user.signedIn) return null

  return (
    <DeleteButton
      onClick={deleteShow}
      aria-label="Delete show"
      title="Delete show"
    >
      <FontAwesomeIcon icon={faTrash} size="lg" />
    </DeleteButton>
  )
}

const DeleteButton = styled.button`
  background: transparent;
  color: var(--text-secondary);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
`
