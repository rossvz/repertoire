import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTrash,
  faUndo,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons"
import styled, { keyframes, css } from "styled-components"

export const AdminFunctions = ({
  song,
  changeVote,
  toggleVisible,
  deleteSong,
  editing,
}) => {
  return (
    <Container $editing={editing}>
      <ButtonsWrapper>
        <AdminButton
          onClick={toggleVisible}
          title={song.visible ? "Hide song" : "Show song"}
        >
          <FontAwesomeIcon icon={song.visible ? faEyeSlash : faEye} />
        </AdminButton>
        <AdminButton onClick={() => changeVote("reset")} title="Reset votes">
          <FontAwesomeIcon icon={faUndo} />
        </AdminButton>
        <AdminButton onClick={deleteSong} title="Delete song">
          <FontAwesomeIcon icon={faTrash} />
        </AdminButton>
      </ButtonsWrapper>
    </Container>
  )
}

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    max-height: 60px;
    opacity: 1;
    transform: translateY(0);
  }
`

const slideUp = keyframes`
  from {
    max-height: 60px;
    opacity: 1;
    transform: translateY(0);
  }
  to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }
`

const Container = styled.div`
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
  border-top: 1px solid var(--border-color);

  ${(props) =>
    props.$editing
      ? css`
          animation: ${slideDown} 0.3s ease forwards;
          max-height: 60px;
        `
      : css`
          animation: ${slideUp} 0.3s ease forwards;
          max-height: 0;
        `}
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 12px;
  gap: 12px;
`

const AdminButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--primary-light);
  }

  &:active {
    transform: scale(0.95);
  }
`
