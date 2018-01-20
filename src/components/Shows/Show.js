import React from 'react'

const Show = ({show}) => <div style={styles.card}>
  <h2>{show._date}</h2>
  <h3>{show.time}</h3>

  <h3>{show.venue}</h3>
  <a style={styles.location} href={show._location} target={'_blank'}>Get Directions</a>
</div>

const styles = {
  card: {
    background: '#f8f8f8',
    width: '75%',
    borderBottom: '2px solid white',
    padding: '5%',
    margin: '3% 0',
    borderRadius: '5px',
    boxShadow: '10px 10px 5px 0 rgba(0,0,0,0.75)'
  },
  location: {}
}

export default Show
