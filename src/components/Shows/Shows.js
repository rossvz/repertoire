import React from 'react'
import Header from '../Header/Header'
import Show from './Show'

const Shows = ({ shows = [], deleteShow }) => {
  console.log('props', shows)
  return (
    <div>
      <Header title={'Upcoming Shows'} />
      <div style={styles.container}>
        {shows.map(show => (
          <Show key={show.id} show={show} deleteShow={deleteShow} />
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8vh'
  }
}

export default Shows
