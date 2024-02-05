import React, { useState } from "react"
import styled from "styled-components"
import { useAuth } from "reactfire"
import { signInWithEmailAndPassword } from "firebase/auth"

import Button from "../common/Button"

export const Login = () => {
  const auth = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = e => {
    e.preventDefault()
    const credentials = {
      email,
      password
    }
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(res => localStorage.setItem("uid", res.user.uid))
      .catch(err => console.error(err))
  }
  return (
    <Container style={limitWidth()}>
      <Form onSubmit={e => onSubmit(e)} autoComplete={"off"}>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="user@gmail.com"
        />
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="********"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  background: url(https://source.unsplash.com/user/erondu);
  background-repeat: no-repeat;
  height: 100vh;
  position: absolute;
  background-size: cover;
`

const Form = styled.form`
  margin-top: 20%;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 5%;
`

const Input = styled.input`
  line-height: 1.8em;
  font-size: 1.5em;
  text-align: center;
  border: none;
  background-color: #f8f8f8;
  margin: 1%;
  border-radius: 100em;
  opacity: 0.6;
`

const limitWidth = () => ({ width: window.innerWidth > 700 ? "59%" : "100%" })
