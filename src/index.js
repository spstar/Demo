import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RegisterState, SubscribeState, RegisterStore} from './hooksStore/store';

ReactDOM.render(
    <React.StrictMode>
        <RegisterState name="Global" reducer={(state, action) => action.payload} initValue="Hello"/>
        <App/>
        <TestOtherRegisterState/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function TestOtherRegisterState() {
    let [state, dispatch] = SubscribeState('Global', useState(null)[1]);

    function onclick() {
        dispatch({payload: String(Math.random()).slice(2)});
    }

    return (
        <div style={{textAlign: 'center', fontSize: 20}} onClick={onclick}>{state}</div>
    );
}
