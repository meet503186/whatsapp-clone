const initialState = false;

const showChatScreen = (state = initialState, action) => {
    switch(action.type) {
        case "SHOW" : return true;
        case "HIDE" : return false;
        default : return state;
    }
}

export default showChatScreen;