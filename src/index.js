import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { SocketProvider } from './socket/SocketProvider';
import store from './store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SocketProvider>
  <BrowserRouter>
    <App />
   </BrowserRouter>
   </SocketProvider>
   </Provider>
);
