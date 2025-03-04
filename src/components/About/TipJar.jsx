import React from "react"
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollarSign, faHeart } from "@fortawesome/free-solid-svg-icons"

const TipJar = () => {
  return (
    <TipJarContainer>
      <TipJarTitle>
        <HeartIcon icon={faHeart} />
        <span>Tip Jar</span>
        <HeartIcon icon={faHeart} />
      </TipJarTitle>

      <TipJarDescription>
        If you're enjoying the music and would like to show your support, tips
        are always appreciated but never expected!
      </TipJarDescription>

      <TipButton
        href="https://linktr.ee/MyTipJar"
        target="_blank"
        rel="noopener noreferrer"
      >
        <DollarIcon icon={faDollarSign} />
        <span>Leave a Tip</span>
      </TipButton>
    </TipJarContainer>
  )
}

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`

const TipJarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
`

const TipJarTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

const HeartIcon = styled(FontAwesomeIcon)`
  color: #ff6b6b;
  font-size: 1rem;
  animation: ${pulse} 2s infinite ease-in-out;
`

const TipJarDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  max-width: 90%;
`

const TipButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  animation: ${float} 3s infinite ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }
`

const DollarIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
`

export default TipJar
