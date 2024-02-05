import { useMemo } from "react"
import { ref, query, orderByChild } from "firebase/database"
import { useDatabase, useDatabaseListData } from "reactfire"
import { reverse } from "ramda"
import { songContainsSearchTerm } from "../../../util/songs"

export const useSongs = (searchFilter = "") => {
  const database = useDatabase()
  const songsRef = ref(database, "songs")

  const songsQuery = query(songsRef, orderByChild("votes"))

  const { status, data: songData } = useDatabaseListData(songsQuery, {
    idField: "id"
  })
  const songs = useMemo(() => {
    if (!songData) return []
    return reverse(songData).filter(songContainsSearchTerm(searchFilter))
  }, [songData, searchFilter])

  return { status, songs }
}
