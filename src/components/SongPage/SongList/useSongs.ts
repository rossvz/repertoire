import { useMemo } from "react"
import { ref, query, orderByChild } from "firebase/database"
import { useDatabase, useDatabaseListData } from "reactfire"
import { songContainsSearchTerm } from "../../../util/songs"
import type { Song } from "../../../types"

export const useSongs = (searchFilter: string = "") => {
  const database = useDatabase()
  const songsRef = ref(database, "songs")

  const songsQuery = query(songsRef, orderByChild("votes"))

  const { status, data: songData } = useDatabaseListData(songsQuery, {
    idField: "id",
  })
  const songs = useMemo(() => {
    if (!songData) return []
    return sortVotes((songData as unknown as Song[]).filter(songContainsSearchTerm(searchFilter)))
  }, [songData, searchFilter])

  return { status, songs }
}

const sortVotes = (votes: Song[]): Song[] => {
  return votes.sort((a, b) => {
    if (a.visible && !b.visible) {
      return -1
    } else if (!a.visible && b.visible) {
      return 1
    } else if (a.votes !== b.votes) {
      return b.votes - a.votes
    } else {
      return a.title.localeCompare(b.title)
    }
  })
}
