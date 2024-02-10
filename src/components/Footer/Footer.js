import React, { useState, useEffect } from "react"
import FooterButton from "./FooterButton"
import styled from "styled-components"

const Footer = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      return setIsScrolling(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <FooterContainer
      style={isScrolling ? styles.scrolling : { transition: "bottom 1s" }}
    >
      <FooterButton title={"Songs"} icon={"music"} route={"/"} />
      <FooterButton title={"Shows"} icon={"calendar-alt"} route={"/shows"} />
      <FooterButton title={"About"} icon={"user-circle"} route={"/about"} />
      <FooterButton title={"Settings"} icon={"cogs"} route="/admin" />
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0px;
  height: 8vh;
  background: rgb(56, 55, 64);
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const styles = {
  scrolling: {
    bottom: "-100px",
    transition: "bottom 1s",
  },
}

export default Footer
