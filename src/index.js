import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'

import store from './redux/store'
// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Sentry.init({
//     dsn: "https://3359e4e126d949a2acaff34dcd7948c6@o411445.ingest.sentry.io/5418089",
//     integrations: [
//         new Integrations.BrowserTracing(),
//     ],
//     tracesSampleRate: 1.0,
// });


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
