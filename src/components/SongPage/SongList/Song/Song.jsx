import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import Upvote from "./Upvote"
import AlbumArtwork from "./AlbumArtwork"
import { AdminFunctions } from "./AdminFunctions"
import { isUpvoted } from "../../../../util/votes"
import { toggleVoteInStorage } from "../../../../util/votes"
import { ref, remove, update, increment } from "firebase/database"
import { useDatabase } from "reactfire"

const Song = ({ song, signedIn, editing, setEditingSong, ...motionProps }) => {
  const database = useDatabase()
  const songRef = ref(database, `songs/${song.id}`)
  const [upvoted, setUpvoted] = useState(isUpvoted(song.id))

  useEffect(() => {
    setUpvoted(isUpvoted(song.id))
  }, [song.id, song.votes])

  const changeVote = async (value) => {
    const alreadyUpvoted = isUpvoted(song.id)
    if (value === "reset") {
      await update(songRef, { votes: 0 })
    } else {
      const incrementValue = alreadyUpvoted ? -1 : 1
      await update(songRef, { votes: increment(incrementValue) })
    }
    setUpvoted(!alreadyUpvoted)

    toggleVoteInStorage(song.id)
  }

  const toggleVisible = () => {
    update(songRef, { visible: !song.visible })
  }

  const deleteSong = () => {
    remove(songRef)
  }

  if (!signedIn && !song.visible) return null

  return (
    <SongCard $visible={song.visible} {...motionProps}>
      <SongContent>
        <AlbumArtworkWrapper>
          <AlbumArtwork albumArtwork={song.albumArtwork} />
        </AlbumArtworkWrapper>

        <SongInfo
          onClick={() => {
            if (editing) setEditingSong(null)
            else setEditingSong(song.id)
          }}
        >
          <SongTitle>{song.title}</SongTitle>
          <ArtistName>{song.artist}</ArtistName>
          <AlbumName>{song.album}</AlbumName>
        </SongInfo>

        <VoteSection>
          <Upvote changeVote={changeVote} upvoted={upvoted} />
          <VoteCount>{song.votes > 0 ? song.votes : ""}</VoteCount>
        </VoteSection>
      </SongContent>

      {signedIn ? (
        <AdminFunctions
          song={song}
          changeVote={changeVote}
          toggleVisible={toggleVisible}
          deleteSong={deleteSong}
          editing={editing}
        />
      ) : null}
    </SongCard>
  )
}

const SongCard = styled(motion.div)`
  width: 100%;
  margin: 8px 0;
  background: var(--background-card);
  border-radius: 8px;
  overflow: hidden;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  opacity: ${(props) => (props.$visible ? 1 : 0.5)};
`

const SongContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 12px;
`

const AlbumArtworkWrapper = styled.div`
  flex-shrink: 0;
`

const SongInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`

const SongTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: var(--text-primary);
`

const ArtistName = styled.div`
  color: var(--primary-light);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const AlbumName = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
`

const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
`

const VoteCount = styled.div`
  font-size: 0.8em;
  color: var(--primary-light);
  font-weight: 600;
  margin-top: 4px;
  height: 1em;
  line-height: 1em;
`

export default Song
