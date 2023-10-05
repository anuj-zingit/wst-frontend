import {combineReducers} from "redux";
import userReducer from "./reducers/user";
import tokenReducer from "./reducers/token";
import websocketTokenReducer from "./reducers/websocketToken";
import credentialsReducer from "./reducers/credentials";
import messageFeedReducer from "./reducers/messageFeed";
import sidebarReducer from "./reducers/sidebar"
import formdataReducer from "./reducers/form";


const appReducer = combineReducers({
    /* your app’s top-level reducers */
    user: userReducer,
    token: tokenReducer,
    credentials: credentialsReducer,
    messageFeed: messageFeedReducer,
    wsToken: websocketTokenReducer,
    showSidebar: sidebarReducer,
    formdata: formdataReducer,
});

export default appReducer;
