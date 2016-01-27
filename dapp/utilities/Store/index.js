import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from '../Redux/promiseMiddleware';
import * as reducers from '../../reducers/index';



export default function() {
  console.log(reducers);
  var reducer = combineReducers(reducers);
  var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);
  var store = finalCreateStore(reducer);

  return store;
}
