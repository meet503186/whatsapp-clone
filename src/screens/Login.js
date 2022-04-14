import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login(props) {
  document.title = "Login";

  const signIn = () => {
    // auth.signInWithPopup(provider).catch(alert);
    auth.signInWithRedirect(provider).catch(alert);
  };

  return (
    <Container>
        <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  background-color: whitesmoke;
`;
const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 50px;
`;
