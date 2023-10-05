const INITIAL_STATE = { data: [] };

let messageFeedReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'UPDATE_MESSAGE_FEED') {
        const { pagination = {}, data } = action.data || {}
        if (pagination.page !== 1) {
            return { pagination, data: [...state.data, ...data] }
        }
        return action.data
    } else if (action.type === 'LOGOUT') {
        return INITIAL_STATE
    } else if (action.type === 'SOCKET_RECEIVE_MESSAGES_UPDATE') {
        const { data } = action
        console.log({ data })
        let updated = [...state.data]
        updated.unshift({ ...data, timestamp: data.date_in })
        return { ...state, data: updated }
    } else {
        return state;
    }
};


export default messageFeedReducer;
