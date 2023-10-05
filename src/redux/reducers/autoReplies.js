const INITIAL_STATE_AUTO_REPLIES = {};

let autoRepliesReducer = (state = INITIAL_STATE_AUTO_REPLIES, action) => {
    if (action.type === 'UPDATE_AUTO_REPLIES_CONFIGURATION') {
        return action.data
    } else if (action.type === 'LOGOUT') {
        return INITIAL_STATE_AUTO_REPLIES
    } else {
        return state;
    }
};

export default autoRepliesReducer;
