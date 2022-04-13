import React, { useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getReceipientEmail from "../utils/getReceipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { selectedId, chatUsers, showChatScreen } from "../actions/actions_index";
import { useSelector, useDispatch } from "react-redux";

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const [receipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getReceipientEmail(users, user))
  );

  const receipient = receipientSnapshot?.docs?.[0]?.data();

  // console.log(receipient);

  const receipientEmail = getReceipientEmail(users, user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const enterChat = () => {
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("users", JSON.stringify(users));

      dispatch(selectedId(id));
      dispatch(chatUsers(users));
      dispatch(showChatScreen());
      console.log(users);
      console.log(state);
    
  };

  // useEffect(() => {
  // }, []);

  return (
    <Container id="chat-container" onClick={() => enterChat()}>
      {receipient ? (
        <UserAvatar src={receipient?.photoURL} />
      ) : (
        <UserAvatar>{receipientEmail[0]}</UserAvatar>
      )}
      <p>{receipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  border-bottom: 1px solid whitesmoke;

  :hover {
    background-color: whitesmoke;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
