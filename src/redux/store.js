import {createStore, compose} from "redux";
import rootReducer from "./reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};



const store = createStore(rootReducer,persistedState,composeEnhancers());

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

export default store;
