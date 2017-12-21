import React from 'react'

const styles = {
  search: {
    width: '100%',
    textAlign: 'center',
    fontSize: '1.4em',
    lineHeight: '1.7em'
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
