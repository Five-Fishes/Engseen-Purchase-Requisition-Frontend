import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from '@module/config/store';
import axios from 'axios';
import 'dotenv/config';
import { setLoading } from '@module/shared/reducers/app-reducers';

// TODO: Temporary Axios Setting
const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use(
  (req) => {
    setLoading(true);
    return req;
  }
);
axios.interceptors.response.use(
  (res) => {
    setLoading(false);
    return res;
  },
  (err) => {
    setLoading(false);
    return Promise.reject(err);
  }
);
// End Temporary Axios Setting

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
