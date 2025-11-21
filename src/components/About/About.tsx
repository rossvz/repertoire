import { Header } from "../Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import {
  faMusic,
  faGuitar,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons"
import Button from "../common/Button"
import styled, { keyframes } from "styled-components"
import TipJar from "./TipJar"
const About = () => {
  return (
    <AboutContainer>
      <Header title="About Me" />

      <ContentWrapper>
        <ProfileSection>
          <MusicIconsContainer>
            <MusicIcon>
              <FontAwesomeIcon icon={faMusic} />
            </MusicIcon>
            <MusicIcon $delay="0.2s">
              <FontAwesomeIcon icon={faGuitar} />
            </MusicIcon>
            <MusicIcon $delay="0.4s">
              <FontAwesomeIcon icon={faMicrophone} />
            </MusicIcon>
          </MusicIconsContainer>
          <BioText>
            I am a singer & guitar player in the Atlanta, Georgia area where I
            perform acoustic covers at local restaurants and private events.
            Thank you for using this app! I hope it will be a fun way for us to
            interact during our time together.
          </BioText>
        </ProfileSection>

        <TipJar />

        <BioSection>
          <Highlight>
            Grab some food, pull up a chair, and let&apos;s sing some songs.
          </Highlight>

          <Signature>— Randy Godwin</Signature>
        </BioSection>

        <SocialSection>
          <SocialLink
            href="https://www.instagram.com/randy.godwin.music/?utm_source=ig_embed&utm_campaign=loading"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialButton>
              <SocialButtonContent>
                <span>Instagram</span>
                <FontAwesomeIcon icon={faInstagram} />
              </SocialButtonContent>
            </SocialButton>
          </SocialLink>

          <SocialLink
            href="https://www.facebook.com/randygodwinmusic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialButton>
              <SocialButtonContent>
                <span>Facebook</span>
                <FontAwesomeIcon icon={faFacebook} />
              </SocialButtonContent>
            </SocialButton>
          </SocialLink>
        </SocialSection>
      </ContentWrapper>
    </AboutContainer>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const AboutContainer = styled.div`
  color: var(--text-primary);
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  flex: 1;
  animation: ${fadeIn} 0.6s ease-out;
`

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MusicIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
`

const MusicIcon = styled.div<{ $delay?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 3s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay || "0s"};

  svg {
    font-size: 20px;
    color: var(--primary-light);
  }
`

const BioSection = styled.div`
  text-align: center;
`

const BioText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
`

const Highlight = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-left: 3px solid var(--primary);
  border-right: 3px solid var(--primary);
  display: inline-block;
`

const Signature = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  margin-top: 1rem;
  color: var(--primary-light);
`

const SocialSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`

const SocialLink = styled.a`
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`

const SocialButton = styled(Button)`
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--primary-rgb), 0.2);
    border-color: var(--primary-light);
  }
`

const SocialButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1rem;

  svg {
    font-size: 1.2rem;
  }
`

export default About
