import React from 'react'

const styles = {
  searchContainer: {
    marginTop: '2%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    textAlign: 'center',
    fontSize: '1em',
    lineHeight: '1.2em'
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
