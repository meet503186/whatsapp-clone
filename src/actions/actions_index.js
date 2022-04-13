export const selectedId = (id) => {
  return {
    type: "SELECTED_ID",
    payload: id,
  };
};

export const chatUsers = (users) => {
  return {
    type: "CHAT_USERS",
    payload: users,
  };
};

export const showChatScreen = () => {
  return {
    type: "SHOW",
  };
};

export const hideChatScreen = () => {
  return {
    type: "HIDE",
  };
};