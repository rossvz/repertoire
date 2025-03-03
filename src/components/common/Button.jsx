import React from "react"
import styled from "styled-components"

const Button = ({ children, variant = "primary", ...props }) => (
  <StyledButton $variant={variant} {...props}>
    {children}
  </StyledButton>
)

const StyledButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  background: ${(props) =>
    props.$variant === "primary"
      ? "var(--primary)"
      : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) =>
    props.$variant === "primary" ? "white" : "var(--text-primary)"};
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$variant === "primary"
        ? "var(--primary-light)"
        : "rgba(255, 255, 255, 0.15)"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    margin-right: ${(props) =>
      props.children && props.children.length > 1 ? "8px" : "0"};
  }
`

export default Button
