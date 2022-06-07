// React modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// External modules
import axios from 'axios';

// Components
import App from './App';

// Styles
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

axios.defaults.baseURL = 'http://localhost:9991';
axios.defaults.withCredentials = true
// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
