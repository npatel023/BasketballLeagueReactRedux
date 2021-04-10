import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainContainer from './containers/MainContainer';
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
