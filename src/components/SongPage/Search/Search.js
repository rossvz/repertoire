import React from 'react'

const styles = {
  search: {
    margin: 20,
  }
}

const Search = ({ value, onChange }) =>
  <input
    onChange={ e => onChange(e.target.value) }
    placeholder="Search"
    style={ styles.search }
    value={ value }
  />

export default Search
