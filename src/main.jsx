import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import GlobalModal from './shared/GlobalModal.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <GlobalModal/>
      </Router>
    </Provider>
  </React.StrictMode>
)


