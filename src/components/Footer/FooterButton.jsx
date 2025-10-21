import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

const FooterButton = ({ route, icon, title }) => {
  const location = useLocation()
  const isActive =
    location.pathname === route || (route === "/" && location.pathname === "")

  return (
    <ButtonLink to={route} $isActive={isActive}>
      <IconWrapper>
        <FontAwesomeIcon icon={icon} />
      </IconWrapper>
      <ButtonText>{title}</ButtonText>
    </ButtonLink>
  )
}

const ButtonLink = styled(Link)`
  text-decoration: none;
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  height: 90%;
  color: ${(props) =>
    props.$isActive ? "var(--primary-light)" : "var(--text-secondary)"};
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-light);
  }
`

const IconWrapper = styled.div`
  font-size: 1.2em;
  margin-bottom: 4px;
`

const ButtonText = styled.span`
  font-size: 0.8em;
  font-weight: 500;
`

export default FooterButton
