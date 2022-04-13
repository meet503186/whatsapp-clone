import idReducer from "./idReducer";
import chatUsersReducer from "./chatUsersReducer";
import showChatScreen from "./showChatScreen";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  idReducer,
  chatUsersReducer,
  showChatScreen,
});

export default rootReducer;
