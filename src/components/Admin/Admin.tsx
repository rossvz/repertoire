import { useCallback } from "react"
import type { SigninCheckResult } from "reactfire"
import styled from "styled-components"
import { useAuth } from "reactfire"

import { Header } from "../Header"
import { LogoutButton } from "./LogoutButton"

const Heading = styled.h2`
  color: white;
  text-align: center;
`

interface AdminProps {
  user: SigninCheckResult
}

export const Admin = ({ user }: AdminProps) => {
  const auth = useAuth()
  const logout = useCallback(() => {
    auth.signOut()
  }, [auth])
  return (
    <div>
      <Header title="Settings" right={<LogoutButton logout={logout} />} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Heading>Logged In</Heading>
        <p>email: {user.user?.email}</p>
      </div>
    </div>
  )
}
