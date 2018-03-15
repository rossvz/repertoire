import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  width: 100%;
  height: 8vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  // box-shadow: 0 0px 10px black;
  font-size: 1.5em;
  color: #b4cbea;
  font-weight: bold;
`

const Title = styled.div`
  font-size: 1.4em;
`

const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
    </HeaderContainer>
  )
}
export default Header
