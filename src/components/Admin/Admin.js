import React from 'react'
import Header from 'components/Header/Header'
import NewSong from 'components/SongPage/NewSong'
import LogoutButton from 'components/Login/LogoutButton'

const Admin = ({firebase}) => {
  return (
    <div>
      <Header title={'Admin'} />
      <NewSong />
      <LogoutButton firebase={firebase} />
    </div>
  )
}

export default Admin
