import React from 'react'
import Header from 'components/Header/Header'
import NewSong from 'components/SongPage/NewSong'
import LogoutButton from 'components/Login/LogoutButton'
import NewShowForm from 'components/Shows/NewShowForm'

const Admin = ({firebase}) => {
  return (
    <div>
      <Header title={'Admin'} />
      <NewSong />
      <NewShowForm />
      <LogoutButton firebase={firebase} />
    </div>
  )
}

export default Admin
