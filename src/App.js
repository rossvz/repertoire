import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'store'
import 'typeface-roboto'
import './App.css'
import Header from 'components/Header'
import NewSong from 'components/NewSong'
import Search from 'components/Search'
import SongList from 'components/SongList'

const App = () =>
  <ReduxProvider store={ store }>
    <div className='App'>
      <Header />
      <Search />
      <NewSong />
      <SongList />
    </div>
  </ReduxProvider>

export default App
