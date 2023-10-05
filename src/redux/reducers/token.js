const INITIAL_STATE = null;

let tokenReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'UPDATE_TOKEN') {
        return action.data
    } else if (action.type === 'CLEAR_TOKEN') {
        return INITIAL_STATE
    } else {
        return state;
    }
};

export default tokenReducer;
