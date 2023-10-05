const INITIAL_STATE_USER = null;

let userReducer = (state = INITIAL_STATE_USER, action) => {
    if (action.type === 'UPDATE_USER') {
        return action.data
    } else if (action.type === 'LOGOUT') {
        return INITIAL_STATE_USER
    } else {
        return state;
    }
};

export default userReducer;
