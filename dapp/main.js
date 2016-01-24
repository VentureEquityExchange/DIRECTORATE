import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { DirectorateApp } from './components/index';

import { Provider } from 'react-redux';
import createStore from './utilities/Store/index';

const store = createStore();


ReactDOM.render(
  <Provider store={store} >
    <DirectorateApp />
  </Provider >
  ,
  document.getElementById('DirectorateApp')
);
