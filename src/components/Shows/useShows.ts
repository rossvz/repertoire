import { useMemo } from "react"
import {
  ref,
  query,
  orderByChild,
  startAfter,
  limitToLast,
} from "firebase/database"
import { useDatabase, useDatabaseListData } from "reactfire"
import { formatShows } from "../../util/shows"
import type { Show } from "../../types"

export const useShows = () => {
  const database = useDatabase()
  const showsRef = ref(database, "shows")

  const showsQuery = query(
    showsRef,
    orderByChild("date"),
    limitToLast(20),
    startAfter("2024-01-01"),
  )
  const { status, data: showsData } = useDatabaseListData(showsQuery, {
    idField: "id",
  })

  const shows = useMemo(() => {
    if (!showsData) return []
    return formatShows(showsData as unknown as Show[])
  }, [showsData])

  return { status, shows }
}
