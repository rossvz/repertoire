import React from "react";
import { Redirect } from "react-router";
import Button from "components/common/Button";
import styled from "styled-components";

const Login = props => {
  window.scrollTo(0, 0);
  const onSubmit = e => {
    e.preventDefault();
    const credentials = {
      email: props.authentication.email,
      password: props.authentication.password
    };
    props.firebase
      .login(credentials)
      .then(res => localStorage.setItem("uid", res.user.uid))
      .catch(err => console.error(err));
  };

  const renderLogin = () => {
    console.log(props.auth);
    if (!props.auth.isEmpty)
      return (
        <div>
          Authenticated!!
          <Redirect to="/admin" />
        </div>
      );
    else return loginForm();
  };

  const loginForm = () => {
    return (
      <Container style={limitWidth()}>
        <Form onSubmit={e => onSubmit(e)} autoComplete={"off"}>
          <Input
            type="email"
            value={props.authentication.email}
            onChange={e => props.emailChanged(e.target.value)}
            placeholder="user@gmail.com"
          />
          <Input
            type="password"
            value={props.authentication.password}
            onChange={e => props.passwordChanged(e.target.value)}
            placeholder="********"
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  };

  return <div>{renderLogin()}</div>;
};

const Container = styled.div`
  background: url(https://source.unsplash.com/user/erondu);
  background-repeat: no-repeat;
  height: 100vh;
  position: absolute;
  background-size: cover;
`;

const Form = styled.form`
  margin-top: 20%;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 5%;
`;

const Input = styled.input`
  line-height: 1.8em;
  font-size: 1.5em;
  text-align: center;
  border: none;
  background-color: #f8f8f8;
  margin: 1%;
  border-radius: 100em;
  opacity: 0.6;
`;

const limitWidth = () => ({ width: window.innerWidth > 700 ? "59%" : "100%" });

export default Login;
