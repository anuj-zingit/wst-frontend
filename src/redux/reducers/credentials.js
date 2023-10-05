const INITIAL_STATE = null;

let credentialsReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'UPDATE_CREDENTIALS') {
        return action.data
    } else if (action.type === 'CLEAR_CREDENTIALS') {
        return INITIAL_STATE
    } else {
        return state;
    }
};

export default credentialsReducer;
