import React, { useState } from "react"
import styled from "styled-components"
import { useSigninCheck } from "reactfire"

import Song from "./Song/Song"
import { useSongs } from "./useSongs"

export const SongList = () => {
  const { status: authStatus, data: user } = useSigninCheck()
  const [searchFilter, setSearchFilter] = useState("")
  const { status: songStatus, songs } = useSongs(searchFilter)

  if (authStatus === "loading" || songStatus === "loading") {
    return <div>Loading...</div>
  }

  return (
    <>
      <SearchContainer>
        <SearchInput
          onChange={e => setSearchFilter(e.target.value)}
          placeholder="Search songs by title, artist, or album..."
          value={searchFilter}
        />
      </SearchContainer>
      <div style={styles.songListStyles}>
        {songs.map(song => (
          <Song key={song.id} song={song} signedIn={user.signedIn} />
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
    padding: "3%",
    paddingBottom: "15%"
  }
}

const SearchContainer = styled.div`
  margin: 2% 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

const SearchInput = styled.input`
  text-align: left;
  font-size: 1.3em;
  //background-color: #19181c;
  background-color: #161519;
  color: white;
  border: 2px solid #b4cbea;
  padding: 2%;
  width: 90%;
`
