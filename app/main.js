import Babel from 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, IndexRoute, hashHistory, useRouterHistory } from 'react-router';
// Application Components


import DirectorateApp from './components/DirectorateApp';
import Loading from './components/Loading';
import SelectAccount from './components/Account/SelectAccount';

function LoadingModal() {
  return <Loading format="modal"/>
}

ReactDOM.render((
  <Router history={hashHistory} createElement={LoadingModal}>
    <Route path="/" component={DirectorateApp}>
      <IndexRoute  component={LoadingModal}/>
      <Route path="/selectaccount/" component={SelectAccount} />
    </Route>
  </Router>), document.getElementById('DirectorateApp'));
