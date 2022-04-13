const initialState = "";

const idReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SELECTED_ID" : return action.payload;

        default : return state;
    }
}

export default idReducer;