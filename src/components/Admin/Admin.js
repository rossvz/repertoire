import React from 'react'
import Header from 'components/Header/Header'
import LogoutButton from 'components/Login/LogoutButton'
import NewShowForm from 'components/Shows/NewShowForm'
import NewSong from 'components/SongPage/NewSong'

const Admin = ({firebase}) => {
  return (
    <div>
      <Header title={'Settings'} />
      <NewShowForm />
      <NewSong />
      <LogoutButton firebase={firebase} />
    </div>
  )
}

export default Admin
