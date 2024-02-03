import React from "react"
import { Header } from "components/Header"

import { LogoutButton } from "components/Login/LogoutButton"
import { NewShowForm } from "components/Shows/NewShowForm/NewShowForm"
import ResetAllVotes from "components/SongPage/ResetAllVotes"
import styled from "styled-components"
import { useAuth } from "reactfire"

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
        <NewShowForm />
        <br />
        <Heading>Songs</Heading>
        {/* <NewSong /> */}
        <ResetAllVotes />
      </div>
      <LogoutButton logout={logout} />
    </div>
  )
}
