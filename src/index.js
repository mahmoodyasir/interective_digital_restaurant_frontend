import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Globalstate} from "./state/provider";
import reducer, {initialstate} from "./state/reducer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Globalstate initialstate={initialstate} reducer={reducer}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Globalstate>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
