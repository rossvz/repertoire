import React, { useState } from "react"
import styled from "styled-components"
import { useSigninCheck } from "reactfire"
import { LayoutGroup } from "framer-motion"

import Song from "./Song/Song"
import { useSongs } from "./useSongs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle, faSearch } from "@fortawesome/free-solid-svg-icons"

export const SongList = () => {
  const { status: authStatus, data: user } = useSigninCheck()
  const [searchFilter, setSearchFilter] = useState("")
  const { status: songStatus, songs } = useSongs(searchFilter)
  const [editingSong, setEditingSong] = useState(null)

  if (authStatus === "loading" || songStatus === "loading") {
    return <LoadingContainer>Loading songs...</LoadingContainer>
  }

  const resetSearch = () => {
    setSearchFilter("")
  }

  return (
    <>
      <SearchContainer>
        <SearchInputWrapper>
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
          <SearchInput
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search title, artist, album"
            value={searchFilter}
          />
          {searchFilter && (
            <ClearButton onClick={resetSearch}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </ClearButton>
          )}
        </SearchInputWrapper>
      </SearchContainer>
      <SongListContainer>
        <LayoutGroup>
          {songs.map((song) => (
            <Song
              key={song.id}
              editing={editingSong === song.id}
              setEditingSong={setEditingSong}
              song={song}
              signedIn={user.signedIn}
              layout
              layoutId={song.id}
              transition={{
                layout: { duration: 0.4, ease: "easeInOut" },
              }}
            />
          ))}
        </LayoutGroup>
      </SongListContainer>
    </>
  )
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: var(--text-secondary);
  font-size: 1.1em;
`

const SearchContainer = styled.div`
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px var(--primary-light);
    background-color: rgba(255, 255, 255, 0.08);
  }
`

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: var(--text-secondary);
`

const SearchInput = styled.input`
  flex: 1;
  font-size: 1rem;
  background-color: transparent;
  color: var(--text-primary);
  border: none;
  padding: 12px 0;
  outline: none;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`

const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0 12px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--text-primary);
  }
`

const SongListContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px 15vh;
  max-width: 800px;
`
