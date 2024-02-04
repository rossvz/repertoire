import React from "react"
import { ref, remove } from "firebase/database"
import { useDatabase } from "reactfire"

export const useDeleteShow = show => {
  const database = useDatabase()
  const showRef = ref(database, `shows/${show.id}`)

  return React.useCallback(() => {
    remove(showRef)
  }, [showRef])
}
