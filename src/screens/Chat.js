import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import ChatScreen from "../components/ChatScreen";
import { db } from "../firebase";
import { useParams } from "react-router-dom"; 

function Chat(props) {
  document.title = "Chat";

  const id = useParams().id;
  // const [chat, setChat] = useState([]);
  // const [messages, setMessages] = useState([]);

  const renderData = async () => {
    const ref = db.collection("chats").doc(id);
  
    // Prep the messages on the server
    const messagesRes = await ref
      .collection("messages")
      .orderBy("timestamp", "asc")
      .get();
  
    const messages = messagesRes.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .map((messages) => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
      }));
  
    // prep the chats
    const chatRes = await ref.get();
  
    const chat = {
      id: chatRes.id,
      ...chatRes.data(),
    };
  
    // setChat(chat);
    // setMessages(messages);

    console.log("chat and messages :- " + chat, messages)
  
    // return {
    //   props: {
    //     messages: JSON.stringify(messages),
    //     chat: chat,
    //   },
    // };
  }

  useEffect(() => {
    renderData();
  }, [])

  return (
    <Container>
      <Sidebar />
      <ChatContainer>
        {/* <ChatScreen chat={chat} messages={messages} id={id} /> */}
      </ChatContainer>
    </Container>
  );
}

export default Chat;

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
