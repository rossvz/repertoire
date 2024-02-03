import Song from "components/SongPage/SongList/Song/Song"
import React, { useMemo, useState } from "react"
import styled from "styled-components"

import "firebase/database"
import { ref, query, orderByChild } from "firebase/database"
import {
  DatabaseProvider,
  useDatabase,
  useDatabaseListData,
  useSigninCheck
} from "reactfire"
import { mapObjIndexed, reverse } from "ramda"
import { songContainsSearchTerm } from "../../../util/songs"
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
          placeholder="Search"
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
    padding: "5%",
    paddingBottom: "15%"
  }
}

const SearchContainer = styled.div`
  margin: 3% 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

const SearchInput = styled.input`
  text-align: left;
  font-size: 1.5em;
  //background-color: #19181c;
  background-color: #161519;
  color: white;
  border: 2px solid #b4cbea;
  padding: 2%;
  border-radius: 100em;
`
