import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"

export const HelperText = () => {
  return (
    <InfoContainer>
      <IconWrapper>
        <FontAwesomeIcon icon={faInfoCircle} />
      </IconWrapper>
      <InfoText>
        Hit the &ldquo;like&rdquo; button on any song to vote for it. Songs
        with higher votes are more likely to get played! Use the search feature
        to find a song by title, artist, or album.
      </InfoText>
    </InfoContainer>
  )
}

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
  padding: 12px 16px;
  background-color: rgba(99, 102, 241, 0.1);
  border-left: 3px solid var(--primary);
  border-radius: 4px;
`

const IconWrapper = styled.div`
  color: var(--primary-light);
  font-size: 1.2rem;
  margin-right: 12px;
  flex-shrink: 0;
`

const InfoText = styled.div`
  color: var(--text-primary);
  font-size: 0.9rem;
  line-height: 1.4;
`
