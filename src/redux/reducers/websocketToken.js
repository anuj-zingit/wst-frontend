// const INITIAL_STATE = {
//     wsToken: null, connected: false
// };

const  INITIAL_STATE = {wsToken: null, connected: false, workstationGuid: null }

let tokenReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'UPDATE_WEBSOCKET_TOKEN') {
        console.log({action: action.data})
        // return { ...state, wsToken: action.data }
        return {...state, wsToken: action.data.wsToken, workstationGuid: action.data.workstationGuid}
    } else if (action.type === 'CLEAR_WEBSOCKET_TOKEN') {
        return { wsToken: null }
    }
    else if (action.type === 'UPDATE_WS_STATUS') {
        return { ...state, connected: action.data }
    } else {
        return state;
    }
};

export default tokenReducer;
