import React from "react"
import styled from "styled-components"
import { useAuth } from "reactfire"

import { Header } from "../Header"
import { LogoutButton } from "./LogoutButton"
import { NewShowWrapper } from "./NewShowForm/NewShowForm"
import ResetAllVotes from "./ResetAllVotes"

const Heading = styled.h2`
  color: white;
  text-align: center;
`

export const Admin = ({ user }) => {
  const auth = useAuth()
  const logout = React.useCallback(() => {
    auth.signOut().then(() => console.log("signed out"))
  }, [auth])
  return (
    <div>
      <Header title={"Settings"} right={<LogoutButton logout={logout} />} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Heading>Shows</Heading>
        <NewShowWrapper />
        <Heading>Songs</Heading>

        <ResetAllVotes />
      </div>
    </div>
  )
}
