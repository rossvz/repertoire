import type { ButtonHTMLAttributes, ReactNode } from "react"
import styled from "styled-components"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary"
}

const Button = ({ children, variant = "primary", ...props }: ButtonProps) => (
  <StyledButton $variant={variant} {...props}>
    {children}
  </StyledButton>
)

const StyledButton = styled.button<{ $variant: "primary" | "secondary" }>`
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
      props.children && (typeof props.children === 'string' ? props.children.length > 0 : Array.isArray(props.children) && props.children.length > 1) ? "8px" : "0"};
  }
`

export default Button
