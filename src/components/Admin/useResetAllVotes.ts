import { useDatabase } from "reactfire"
import { update, ref } from "firebase/database"
import React from "react"
import type { Song } from "../../types"

import { removeVoteFromStorage } from "../../util/votes"

export const useResetAllVotes = () => {
  const database = useDatabase()
  const songsRef = ref(database, "songs")
  return React.useCallback(
    (songs: Song[]) => {
      const updates: Record<string, number> = {}
      songs
        .filter((s) => s.votes !== 0)
        .forEach((song) => {
          updates[`/${song.id}/votes`] = 0
          removeVoteFromStorage(song.id)
        })

      update(songsRef, updates)
    },
    [songsRef],
  )
}
