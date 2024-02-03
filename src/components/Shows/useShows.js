import { useMemo } from "react"
import { ref, query, orderByChild } from "firebase/database"
import { useDatabase, useDatabaseListData } from "reactfire"
import { formatShows } from "../../util/shows"

export const useShows = () => {
  const database = useDatabase()
  const showsRef = ref(database, "shows")

  const showsQuery = query(showsRef, orderByChild("date"))
  const { status, data: showsData } = useDatabaseListData(showsQuery, {
    idField: "id"
  })

  const shows = useMemo(() => {
    if (!showsData) return []
    return formatShows(showsData)
  }, [showsData])

  return { status, shows }
}
