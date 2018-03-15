import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 3% 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  text-align: center;
  font-size: 1.8em;
  background-color: #19181c;
  color: white;
  border: none;
  padding: 2%;
  border-radius: 100em;
`

const Search = ({ value, onChange }) => (
  <Container>
    <Input
      onChange={e => onChange(e.target.value)}
      placeholder="Search"
      value={value}
    />
  </Container>
)

export default Search
