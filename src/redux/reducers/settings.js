const INITIAL_STATE_SETTINGS = {notifications: true,sendMessageOnEnter: false};

let settingsReducer = (state = INITIAL_STATE_SETTINGS, action) => {
    if (action.type === 'UPDATE_SETTINGS') {
        return action.data
    } else if (action.type === 'LOGOUT') {
        return INITIAL_STATE_SETTINGS
    } else {
        return state;
    }
};

export default settingsReducer;
