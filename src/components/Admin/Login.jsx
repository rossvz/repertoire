import { useState } from "react"
import styled from "styled-components"
import { useAuth } from "reactfire"
import { signInWithEmailAndPassword } from "firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons"

import Button from "../common/Button"

export const Login = () => {
  const auth = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    setError("")

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => localStorage.setItem("uid", res.user.uid))
      .catch((_err) => {
        // console.error(_err)
        setError("Invalid email or password")
      })
  }

  return (
    <Container>
      <LoginHeader>Admin Login</LoginHeader>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={(e) => onSubmit(e)} autoComplete="off">
        <InputGroup>
          <InputIcon>
            <FontAwesomeIcon icon={faEnvelope} />
          </InputIcon>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@gmail.com"
            required
          />
        </InputGroup>
        <InputGroup>
          <InputIcon>
            <FontAwesomeIcon icon={faLock} />
          </InputIcon>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </InputGroup>
        <Button
          type="submit"
          style={{ width: "100%", maxWidth: "360px", marginTop: "16px" }}
        >
          Sign In
        </Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    var(--background-dark) 0%,
    var(--background-darker) 100%
  );
`

const LoginHeader = styled.h1`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 24px;
  text-align: center;
  font-weight: 500;
`

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const InputGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const InputIcon = styled.div`
  color: var(--text-secondary);
  opacity: 0.7;
  transform: translateX(30px);
`

const Input = styled.input`
  width: 75%;
  max-width: 360px;
  padding: 12px 12px 12px 40px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
  }

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.5;
  }
`

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  width: 90%;
  max-width: 360px;
`

// const limitWidth = () => ({ width: window.innerWidth > 700 ? "59%" : "100%" })
