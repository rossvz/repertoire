import React from 'react'
import Header from '../Header'
import Search from './Search'
import NewSong from './NewSong'
import SongList from './SongList'

const styles = {
  songPage: {}
}
const SongPage = (props) => {
  return (
    <div style={styles.songPage}>
      <Header />
      <Search />
      <NewSong />
      <SongList />
    </div>
  )
}

export default SongPage
