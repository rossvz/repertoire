import React, { useState, useEffect } from "react"
import FooterButton from "./FooterButton"
import styled from "styled-components"

import {
  faMusic,
  faCalendarAlt,
  faUserCircle,
  faCogs,
} from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      return setIsScrolling(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <FooterContainer
      style={isScrolling ? styles.scrolling : { transition: "bottom 1s" }}
    >
      <FooterButton title={"Songs"} icon={faMusic} route={"/"} />
      <FooterButton title={"Shows"} icon={faCalendarAlt} route={"/shows"} />
      <FooterButton title={"About"} icon={faUserCircle} route={"/about"} />
      <FooterButton title={"Settings"} icon={faCogs} route="/admin" />
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
