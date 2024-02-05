import { useDatabase } from "reactfire"
import { update, ref } from "firebase/database"
import React from "react"

import { removeVoteFromStorage } from "../../util/votes"

export const useResetAllVotes = () => {
  const database = useDatabase()
  const songsRef = ref(database, "songs")
  return React.useCallback(
    songs => {
      const updates = {}
      songs
        .filter(s => s.votes > 0)
        .forEach(song => {
          removeVoteFromStorage(song.id)
          updates[`/${song.id}`] = { ...song, votes: 0 }
        })

      update(songsRef, updates)
    },
    [songsRef]
  )
}
