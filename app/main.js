import 'babel/polyfill';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';



import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router';
// import { createBrowserHistory } from 'history';
//
import * as reducers from './reducers/index';
import { DirectorateApp, Loading, SelectAccount } from './components/index';


const middleware = syncHistory(hashHistory);
const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
});


const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

const finalCreateStore = compose(
  applyMiddleware(middleware),
  DevTools.instrument()
)(createStore)
const store = finalCreateStore(reducer)
middleware.listenForReplays(store)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={hashHistory}>
        <Route path="/" component={DirectorateApp}>
          <IndexRoute component={Loading}/>
          <Route path="selectaccount" component={SelectAccount}/>
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('DirectorateApp')
)
