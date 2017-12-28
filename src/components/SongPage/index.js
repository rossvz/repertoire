import React from 'react'
import Header from '../Header'
import Search from './Search'
import NewSong from './NewSong'
import SongList from './SongList'
import HelperText from './HelperText'

const styles = {
  songPage: {}
}
const SongPage = (props) => {
  return (
    <div style={styles.songPage}>
      <Header />
      <Search />
      <HelperText />
      <NewSong />
      <SongList />
    </div>
  )
}

export default SongPage
