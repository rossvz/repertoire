import React, { useState } from "react"
import styled from "styled-components"
import { useSigninCheck } from "reactfire"

import Song from "./Song/Song"
import { useSongs } from "./useSongs"
import FontAwesome from "react-fontawesome"

export const SongList = () => {
  const { status: authStatus, data: user } = useSigninCheck()
  const [searchFilter, setSearchFilter] = useState("")
  const { status: songStatus, songs } = useSongs(searchFilter)
  const [edittingSong, setEdittingSong] = useState(null)

  if (authStatus === "loading" || songStatus === "loading") {
    return <div>Loading...</div>
  }

  const resetSearch = () => {
    setSearchFilter("")
  }

  return (
    <>
      <SearchContainer>
        <SearchInput
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Search title, artist, album"
          value={searchFilter}
        />
        <div onClick={resetSearch}>
          <FontAwesome
            name="times-circle"
            style={{
              color: "white",
              fontSize: "1.8em",
              fontWeight: "bold",
              cursor: "pointer",
              margin: "0 10px",
            }}
          />
        </div>
      </SearchContainer>
      <div style={styles.songListStyles}>
        {songs.map((song) => (
          <Song
            editting={edittingSong === song.id}
            setEdittingSong={setEdittingSong}
            key={song.id}
            song={song}
            signedIn={user.signedIn}
          />
        ))}
      </div>
    </>
  )
}

const styles = {
  songListStyles: {
    margin: "0 auto !important",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    paddingBottom: "15%",
  },
}

const SearchContainer = styled.div`
  margin: 1% 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const SearchInput = styled.input`
  text-align: left;
  font-size: 1.3em;
  background-color: #161519;
  color: white;
  border: none;
  border-bottom: 2px solid #b4cbea;
  padding: 5px;
  width: 75%;
`
