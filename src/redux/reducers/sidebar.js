const INITIAL_STATE = true;

let sidebarReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'SHOW_SIDEBAR') {
        return action.data
    } else {
        return state;
    }
};

export default sidebarReducer;
