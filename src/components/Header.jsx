import React from "react"
import styled from "styled-components"

export const Header = (props) => {
  const title = props.title || "Randy Godwin Music"
  const left = props.left || null
  const right = props.right || <div></div>
  return (
    <HeaderContainer>
      <Section>{left}</Section>
      <Title>{title}</Title>
      <Section>{right}</Section>
    </HeaderContainer>
  )
}

const Section = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b4cbea;
  font-weight: bold;
  padding: 0 0px;
`

const Title = styled.div`
  flex: 2;
  font-size: 20px;
  text-align: center;
`
