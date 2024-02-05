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
      <Header title={"Settings"} />
      <div>
        <Heading>Shows</Heading>
        <NewShowWrapper />
        <br />
        <Heading>Songs</Heading>
        {/* <NewSong /> */}
        <ResetAllVotes />
      </div>
      <LogoutButton logout={logout} />
    </div>
  )
}
