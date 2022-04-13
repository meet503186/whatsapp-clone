import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { auth, db, firebase } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
  ArrowBack,
} from "@material-ui/icons";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import getReceipientEmail from "../utils/getReceipientEmail";
import TimeAgo from "timeago-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWindowSize from "../useWindowSize";
import { hideChatScreen, showChatScreen } from "../actions/actions_index";

function ChatScreen({ id, users }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);

  const width = useWindowSize().width;

  const dispatch = useDispatch();
  // const id = useParams().id;
  // const users = useParams().users;
  // const id = JSON.parse(localStorage.getItem("id"));
  // const users = JSON.parse(localStorage.getItem("users"));

  // console.log("chat screen :- " + users);
  // const id = useSelector((state) => state.idReducer);
  // const users = useSelector((state) => state.chatUsersReducer);

  console.log("users :- " + users);

  // const chat = JSON.parse(localStorage.getItem("chat"));
  // const messages = JSON.parse(localStorage.getItem("messages"));

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
    //  else {
    //   return messages.map((message) => (
    //     <Message key={message.id} user={message.user} message={message} />
    //   ));
    // }
  };

  // console.log("chat in chat screen :-" + chat);
  // console.log("messages in chat screen :- " + messages)

  const [receipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getReceipientEmail(users, user))
  );

  const sendMessage = (e) => {
    e.preventDefault();

    // update the last seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    ScrollToBottom();
  };

  const receipient = receipientSnapshot?.docs?.[0]?.data();

  const receipientEmail = getReceipientEmail(users, user);

  // useEffect(() => {
  //   setReceipientEmail(getReceipientEmail(chat.users, user));
  // }, [chat, messages, id]);

  console.log(receipientEmail);

  const ScrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  return (
    <Container>
      <Header>
        {width <= 800 ? (
          <IconButton onClick={() => dispatch(hideChatScreen())}>
            <ArrowBack />
          </IconButton>
        ) : null}
        {receipient ? (
          <Avatar src={receipient?.photoURL} />
        ) : (
          <Avatar>{receipientEmail[0]}</Avatar>
        )}
        <HeaderInformation
          style={
            width <= 400
              ? { width: "50%", overflow: "hidden", whiteSpace: "nowrap" }
              : { width: "auto" }
          }
        >
          <h3
            style={
              width <= 400
                ? {
                    fontSize: "15px",
                    margin: "auto",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }
                : { fontSize: "20px" }
            }
          >
            {receipientEmail}
          </h3>
          {receipientSnapshot ? (
            <p
              style={
                width <= 400
                  ? { overflow: "hidden", textOverflow: "ellipsis" }
                  : null
              }
            >
              Last Seen:{" "}
              {receipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={receipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} onClick={sendMessage} type="submit">
          Send Message
        </button>
        <Mic />
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: grey;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  background-color: white;
  bottom: 0;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin: 0 15px;
`;
