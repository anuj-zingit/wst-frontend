import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../Utilities/history';
import config from "../config/config";

const SocketWrapper = (props) => {
    const { children, passSocketToChild } = props;
    const ws = useSelector(state => state.wsToken)
    const token = useSelector(state => state.token)
    const URL = config['qa'].SOCKET_URL
    const socketRef = useRef('')
    useEffect(() => {
        if (ws && ws.wsToken && ws?.workstationGuid) {
            try {
                const wkId = ws?.workstationGuid || ''
                const socket = io(URL, {
                    autoConnect: true,
                    reconnection: true,
                    reconnectionDelay: 500,
                    // transport: ['websocket', 'polling', 'flashsocket'],
                    // credentials: true,
                    query: 'token=' + ws.wsToken
                });
                console.log({ socket })
                socket.once("connect", () => {
                    passSocketToChild(socket)
                })
                socket.on("connect", () => {
                    socketRef.current = ''
                    console.log("==============connected==============on ============"+ wkId)
                    socket.emit('join', { event: 'connected', data: { room: wkId.replaceAll('{', '').replaceAll('}', ''), greeting: 'From inbox' } });

                })
                socket.on('connect_error', function (err) {
                    console.log({ err: err && err.data })
                    if (err && err.data && err.data.statusCode === 401) {
                        localStorage.clear();
                        history.push("/login")
                    }
                });
                socket.on('disconnect', (data) => {
                    console.log("==================Not connected======================")
                    if (!navigator.onLine) {
                        socketRef.current = 'Not internet connection found.'
                    }
                })
                return function cleanup() {
                    console.log({ socket })
                    socket.disconnect()
                    console.log({ socket })
                    console.log("offf")
                }
            } catch (error) {
                console.log(error)
            }
        } else if (!ws && token) {
            localStorage.clear();
            history.push("/login")
        }
    }, [ws, URL, token, passSocketToChild]);
    return <>{socketRef && <span>{socketRef?.current}</span>}{children}</>
}

SocketWrapper.propTypes = {
    name: PropTypes.string.isRequired,
    childSocketListener: PropTypes.string.isRequired,
    passSocketToChild: PropTypes.func.isRequired,
}

SocketWrapper.defaultProps = {
    name: '',
    childSocketListener: () => null,
    passSocketToChild: () => null
}

export default SocketWrapper