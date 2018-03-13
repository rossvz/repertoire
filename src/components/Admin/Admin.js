import React from 'react'
import Header from 'components/Header/Header'
import LogoutButton from 'components/Login/LogoutButton'
import NewShowForm from 'components/Shows/NewShowForm'
import NewSong from 'components/SongPage/NewSong'
import ResetAllVotes from 'components/SongPage/ResetAllVotes'

const Admin = ({ firebase }) => {
  return (
    <div>
      <Header title={'Settings'} />
      <div style={styles.container}>
        <h2 style={styles.heading}>Shows</h2>
        <NewShowForm />
        <br />
        <h2 style={styles.heading}>Songs</h2>
        <NewSong />
        <ResetAllVotes />
      </div>
      <LogoutButton firebase={firebase} />
    </div>
  )
}

const styles = {
  heading: {
    color: 'white',
    justifyContent: 'center'
  }
}

export default Admin
