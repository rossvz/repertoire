import React from "react"
import styled from "styled-components"

const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b4cbea;
  font-weight: bold;
  padding: 0 0px;
`

const Title = styled.div`
  font-size: 18px;
  text-align: center;
`

export const Header = (props) => {
  const title = props.title || "Randy Godwin Music"
  const left = props.left || null
  const right = props.right || <div></div>
  return (
    <HeaderContainer>
      <Section>{left}</Section>
      <Section>
        <Title>{title}</Title>
      </Section>
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
