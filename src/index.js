import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/Main';
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
