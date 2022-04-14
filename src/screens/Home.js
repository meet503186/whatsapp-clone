import React from "react";
import ChatScreen from "../components/ChatScreen";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useWindowSize from "../useWindowSize";

function Home(props) {
  document.title = "WhatsApp 2.0";

  const width = useWindowSize().width;
  const height = useWindowSize().height;

  const id = useSelector((state) => state.idReducer);
  const users = useSelector((state) => state.chatUsersReducer);
  const isChatScreen = useSelector((state) => state.showChatScreen);

  //   const id = JSON.parse(localStorage.getItem("id"));
  //   const users = JSON.parse(localStorage.getItem("users"));

  console.log("home :- " + isChatScreen);

  return (
    <Container style={{ height: height}}>
      {width <= 800 && isChatScreen ? null : <Sidebar width={width} />}
      <ChatContainer>
        {isChatScreen ? <ChatScreen id={id} users={users} /> : null}
      </ChatContainer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
