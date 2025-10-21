import styled from "styled-components"

export const Header = (props) => {
  const title = props.title || "Randy Godwin Music"
  const left = props.left || null
  const right = props.right || <div />
  return (
    <HeaderContainer>
      <Section>{left}</Section>
      <Title>{title}</Title>
      <Section>{right}</Section>
    </HeaderContainer>
  )
}

const Section = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  font-weight: 600;
  padding: 0;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
`

const Title = styled.div`
  flex: 2;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.5px;
`
