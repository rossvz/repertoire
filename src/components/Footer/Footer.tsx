import { useState, useEffect } from "react"
import type { CSSProperties } from "react"
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
      style={
        isScrolling ? styles.scrolling : { transition: "bottom 0.3s ease" }
      }
    >
      <FooterContent>
        <FooterButton title="Songs" icon={faMusic} route="/" />
        <FooterButton title="Shows" icon={faCalendarAlt} route="/shows" />
        <FooterButton title="About" icon={faUserCircle} route="/about" />
        <FooterButton title="Settings" icon={faCogs} route="/admin" />
      </FooterContent>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0px;
  height: 8vh;
  width: 100%;
  z-index: 100;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`

const FooterContent = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(30, 30, 36, 0.7);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`

const styles: Record<string, CSSProperties> = {
  scrolling: {
    bottom: "-100px",
    transition: "bottom 0.3s ease",
  },
}

export default Footer
