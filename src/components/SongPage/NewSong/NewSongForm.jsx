import React, { useState } from "react"
import { useDatabase } from "reactfire"
import moment from "moment"
import { ref, set, push } from "firebase/database"
import styled from "styled-components"
import { search } from "../../../util/Spotify"
import Button from "../../common/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faTimes,
  faPlus,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"

const INITIAL_SONG_STATE = {
  title: "",
  artist: "",
  artistUrl: "",
  album: "",
  votes: 0,
  visible: true,
}

export const NewSongForm = ({ toggleIsEditing }) => {
  const [searching, setSearching] = useState(false)
  const [titleQuery, setTitleQuery] = useState("")
  const [artistQuery, setArtistQuery] = useState("")
  const [results, setResults] = useState(null)

  const database = useDatabase()
  const songsRef = ref(database, "songs")

  const searchSong = (e) => {
    setSearching(true)
    e.preventDefault()
    search({ title: titleQuery, artist: artistQuery }).then((results) => {
      console.log("Search results:", results.data.items)
      setResults(results.data.items)
      setSearching(false)
    })
  }

  const saveSong = (result) => {
    const newSong = {
      artist: result.artists[0].name,
      artistId: result.artists[0].id,
      album: result.album.name,
      title: result.name,
      albumArtwork: result.album.images[0]?.url,
      releaseDate: result.album.release_date,
      votes: 0,
      visible: true,
    }

    const newSongRef = push(songsRef)
    set(newSongRef, newSong)
    toggleIsEditing()
  }

  const resetSearch = () => {
    setResults([])
    setTitleQuery("")
    setArtistQuery("")
  }

  return (
    <ModalBackdrop>
      <ModalContainer>
        <CloseButton onClick={toggleIsEditing}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>

        <SearchForm onSubmit={searchSong}>
          <SearchInput
            type="text"
            placeholder="Title"
            onChange={(e) => setTitleQuery(e.target.value)}
            value={titleQuery}
            required
          />
          <SearchInput
            type="text"
            placeholder="Artist (optional)"
            onChange={(e) => setArtistQuery(e.target.value)}
            value={artistQuery}
          />

          <ButtonContainer>
            <Button type="button" onClick={resetSearch} variant="secondary">
              <FontAwesomeIcon icon={faTimes} /> Clear
            </Button>
            <Button type="submit" disabled={searching}>
              <FontAwesomeIcon icon={faSearch} />{" "}
              {searching ? "Searching..." : "Search"}
            </Button>
          </ButtonContainer>
        </SearchForm>

        {results?.length > 0 && (
          <>
            <ResultsHeader>
              <ResultsCount>{results.length} results found</ResultsCount>
              <ResultsInstructions>Select a song to add</ResultsInstructions>
            </ResultsHeader>
            <ResultsDivider />
            <ResultsContainer>
              {results.map((result, index) => (
                <SongResult key={`${result.id}-${index}`}>
                  <SongContent>
                    <AlbumArtworkWrapper>
                      {result.album.images && result.album.images[0] && (
                        <AlbumArtwork
                          src={result.album.images[0].url}
                          alt={result.album.name}
                        />
                      )}
                    </AlbumArtworkWrapper>

                    <SongInfo>
                      <SongTitle>{result.name}</SongTitle>
                      <ArtistName>{result.artists[0]?.name}</ArtistName>
                      <AlbumName>{result.album.name}</AlbumName>
                      {result.album.release_date && (
                        <ReleaseDate>
                          {moment(result.album.release_date).format(
                            "MMMM Do, YYYY",
                          )}
                        </ReleaseDate>
                      )}
                    </SongInfo>

                    <SelectButton onClick={() => saveSong(result)}>
                      <FontAwesomeIcon icon={faPlus} /> Select
                    </SelectButton>
                  </SongContent>
                </SongResult>
              ))}
            </ResultsContainer>
          </>
        )}

        {searching && (
          <SearchingIndicator>
            <FontAwesomeIcon icon={faSpinner} spin /> Searching...
          </SearchingIndicator>
        )}

        {results?.length === 0 && !searching && titleQuery.length > 3 && (
          <NoResults>No results found. Try a different search.</NoResults>
        )}
      </ModalContainer>
    </ModalBackdrop>
  )
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  background: rgba(32, 32, 38, 0.85);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 2;

  &:hover {
    color: var(--text-primary);
  }
`

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`

const SearchInput = styled.input`
  padding: 14px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  font-size: 1rem;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 4px;
`

const ResultsCount = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`

const ResultsInstructions = styled.div`
  font-size: 14px;
  color: var(--primary-light);
  font-weight: 500;
`

const ResultsDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
  width: 100%;
`

const ResultsContainer = styled.div`
  overflow-y: auto;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 8px;
  margin: 0 -4px 0 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 3px;
  }
`

const SongResult = styled.div`
  background: var(--background-card);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  margin-bottom: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    border-color: rgba(var(--primary-rgb), 0.3);
  }
`

const SongContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 12px;
  min-height: 80px;
`

const AlbumArtworkWrapper = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AlbumArtwork = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`

const SongInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`

const SongTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ArtistName = styled.div`
  color: var(--primary-light);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const AlbumName = styled.div`
  font-style: italic;
  color: var(--text-secondary);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ReleaseDate = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
`

const SelectButton = styled(Button)`
  flex-shrink: 0;
  background: var(--primary);

  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px) scale(1.05);
  }
`

const SearchingIndicator = styled.div`
  text-align: center;
  color: var(--text-primary);
  font-size: 1.2rem;
  margin: 20px 0;
`

const NoResults = styled.div`
  text-align: center;
  color: var(--text-secondary);
  margin: 20px 0;
`

export default NewSongForm
