import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { initializeAuth } from './redux/actions/loginAction';
import store from "./redux/store/store";
import App from './App';
import './index.css';

store.dispatch(initializeAuth());
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);