import React from "react"
import FooterButton from "./FooterButton"
import styled from "styled-components"

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0px;
  height: 8vh;
  background: rgb(56, 55, 64);
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`

const Footer = () => {
  return (
    <FooterContainer style={limitWidth()}>
      <FooterButton title={"Songs"} icon={"music"} route={"/"} />
      <FooterButton title={"Shows"} icon={"calendar-alt"} route={"/shows"} />
      <FooterButton title={"About"} icon={"user-circle"} route={"/about"} />
      <FooterButton title={"Settings"} icon={"cogs"} route="/admin" />
    </FooterContainer>
  )
}

const limitWidth = () => ({ width: "100%" })

export default Footer
