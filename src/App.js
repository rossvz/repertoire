import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import 'typeface-roboto'
import store from 'store';
import './App.css'
import SongList from './components/SongList'

const App = () =>
  <ReduxProvider store={ store }>
    <div className='App'>
      <SongList />
    </div>
  </ReduxProvider>

export default App
