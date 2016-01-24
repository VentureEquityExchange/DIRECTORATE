import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from '../Redux/promiseMiddleware';
import * as reducers from '../../reducers/index';

console.log(reducers);

export default function() {
  var reducer = combineReducers(reducers);
  var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);
  var store = finalCreateStore(reducer);

  return store;
}
