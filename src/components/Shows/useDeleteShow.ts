import React from "react"
import { ref, remove } from "firebase/database"
import { useDatabase } from "reactfire"
import type { Show } from "../../types"

export const useDeleteShow = (show: Show) => {
  const database = useDatabase()
  const showRef = ref(database, `shows/${show.id}`)

  return React.useCallback(() => {
    remove(showRef)
  }, [showRef])
}
