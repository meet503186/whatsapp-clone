const initialState = [];

const chatUsersReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHAT_USERS" : return action.payload;

        default : return state;
    }
}

export default chatUsersReducer;