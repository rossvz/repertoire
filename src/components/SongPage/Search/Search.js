import React from 'react'

const styles = {
  searchContainer: {
    margin: '3% 0',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    width: '95vw',
    textAlign: 'center',
    fontSize: '1.8em',
    backgroundColor: '#19181c',
    color: 'white',
    border: 'none',
    padding: '2%'
  }
}

const Search = ({ value, onChange }) =>
  <div style={styles.searchContainer}>
    <input
      onChange={e => onChange(e.target.value)}
      placeholder="Search"
      style={styles.searchInput}
      value={value}
    />
  </div>

export default Search
