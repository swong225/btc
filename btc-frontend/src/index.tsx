import * as React from 'react';
import { applyMiddleware, createStore } from 'redux';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';

import Root from './containers/Root';
import Modals from './containers/Modals';
import rootReducer from './redux/rootReducer';
import { fromJS } from 'immutable';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bulma/css/bulma.css';
import 'animate.css/animate.min.css';
import registerServiceWorker from './registerServiceWorker';

const persistedState = localStorage.getItem('user')
  ? {
      user: fromJS({
        data: JSON.parse(localStorage.getItem('user') || '')
      })
    }
  : {};

const StoreInstance = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider store={StoreInstance}>
    <div className="app-container">
      <BrowserRouter>
        <div className="app-container">
          <Root />
          <Modals />
        </div>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        type="default"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
