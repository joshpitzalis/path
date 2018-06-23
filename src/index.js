import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './styles/root.css';

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const middleware = [thunk];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
