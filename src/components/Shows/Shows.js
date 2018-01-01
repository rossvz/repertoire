import React from 'react'
import Header from '../Header/Header'

const shows = [
  {id: 1, date: '1/2/18', time: '7pm-9pm', venue: `Ross's Rib Shack`},
  {id: 2, date: '1/2/18', time: '7pm-9pm', venue: `Ross's Rib Shack`},
  {id: 3, date: '1/2/18', time: '7pm-9pm', venue: `Ross's Rib Shack`},
  {id: 4, date: '1/2/18', time: '7pm-9pm', venue: `Ross's Rib Shack`},
  {id: 5, date: '1/2/18', time: '7pm-9pm', venue: `Ross's Rib Shack`},
  {id: 6, date: '1/2/18', time: '7pm-9pm', venue: `Ross's Rib Shack`},

]

const Show = ({show}) => <div style={showStyles.card}>
  <h1>{show.date}</h1>
  <h2>{show.venue}</h2>
  <h3>{show.time}</h3>
</div>

const Shows = (props) => {
  return (
    <div>
      <Header title={'Upcoming Shows'} />
      <div style={styles.container}>
        {shows.map(show => <Show key={show.id} show={show} />)}
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

const showStyles = {
  card: {
    background: '#f8f8f8',
    width: '70%',
    borderBottom: '2px solid white',
    padding: '5%',
    margin: '3% 0',
    borderRadius: '5px',
    textTransform: 'uppercase'
  }
}

export default Shows
