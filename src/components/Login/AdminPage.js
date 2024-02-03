import { Login } from "./Login"
import { useFirebaseApp, DatabaseProvider } from "reactfire"
import { getDatabase } from "firebase/database"
import React, { useEffect } from "react"
import { useSigninCheck, useAuth } from "reactfire"
import { Admin } from "../Admin"

export const AdminPage = () => {
  const firebaseApp = useFirebaseApp()
  const database = getDatabase(firebaseApp)

  return (
    <DatabaseProvider sdk={database}>
      <CheckAuthenticated />
    </DatabaseProvider>
  )
}
const CheckAuthenticated = () => {
  const { status: authStatus, data: user } = useSigninCheck()
  return user && user.signedIn ? <Admin user={user} /> : <Login />
}
