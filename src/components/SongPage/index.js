import React from 'react'
import Header from '../Header'
import Search from './Search'
import NewSong from './NewSong'
import SongList from './SongList'

const SongPage = (props) => {
  return (
    <div className="App">
      <Header />
      <Search />
      <NewSong />
      <SongList />
    </div>
  )
}

export default SongPage
