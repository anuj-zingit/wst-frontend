export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        data: user,
    };
};

export const updateToken = (token) => {
    return {
        type: 'UPDATE_TOKEN',
        data: token,
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const socketUpdateConversation = (data) => {
    return {
        type: 'SOCKET_CONVERSATION_UPDATE',
        data
    }
}

export const socketReceiveMessagesUpdate = (data) => {
    return {
        type: 'SOCKET_RECEIVE_MESSAGES_UPDATE',
        data,
    }
}

export const socketSendMessagesUpdate = (data) => {
    return {
        type: 'SOCKET_SENT_MESSAGES_UPDATE',
        data,
    }
}


export const updateWebSocketToken = (data) => {
    return {
        type: 'UPDATE_WEBSOCKET_TOKEN',
        data,
    }
}

export const updateSocketStatus = (data) => {
    return {
        type: 'UPDATE_WS_STATUS',
        data,
    }
}


export const updateFromValue = (data) => {
    return {
        type: 'FORM_DATA',
        data,
    }
}
export const clearFromValue = (data) => {
    return {
        type: 'CLEAR_FORM_DATA',
        data,
    }
}