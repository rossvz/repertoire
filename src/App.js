import React, { Component } from 'react'
import './App.css'
import SongList from './components/SongList'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {messages: []}
  }

  render () {
    return (
      <div>
        <SongList />
      </div>
    )
  }
}

export default App
