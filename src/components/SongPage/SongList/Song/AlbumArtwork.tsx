import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMusic } from "@fortawesome/free-solid-svg-icons"

interface AlbumArtworkProps {
  albumArtwork?: string
}

const AlbumArtwork = ({ albumArtwork }: AlbumArtworkProps) => {
  if (!albumArtwork) {
    return (
      <PlaceholderWrapper>
        <FontAwesomeIcon icon={faMusic} />
      </PlaceholderWrapper>
    )
  }

  return <AlbumImage src={albumArtwork} alt="Album artwork" />
}

const PlaceholderWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.2) 0%,
    rgba(99, 102, 241, 0.1) 100%
  );
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-light);
  font-size: 1.5rem;
`

const AlbumImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`

export default AlbumArtwork
