const INITIAL_STATE = [];

let conversationsReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'UPDATE_CONVERSATIONS') {
        return action.data
    } else if (action.type === 'LOGOUT') {
        return INITIAL_STATE
    }
    else if (action.type === 'SOCKET_CONVERSATION_UPDATE') {
        const { data } = action
        console.log({ data })
        const { mobile, message, firstname, lastname, date_in, message_type } = data || {}
        const updatedState = [...state]
        const updatedIndex = updatedState.findIndex(o => o.phone === mobile)
        console.log({ mobile, message, updatedIndex, updatedState, message_type })
        if (updatedIndex !== -1) {
            //
            const updatedConversation = { ...updatedState[updatedIndex], read: message_type === 'Received' ? false : true, lastMessage: message, timestamp: date_in }
            updatedState.splice(updatedIndex, 1)
            updatedState.unshift(updatedConversation)
        } else {
            updatedState.unshift({ contact: { firstname, lastname }, timestamp: date_in, phone: mobile, read: message_type === 'Received' ? false : true, lastMessage: message })
        }
        return [...updatedState]
    } else {
        return state;
    }
};

export default conversationsReducer;
