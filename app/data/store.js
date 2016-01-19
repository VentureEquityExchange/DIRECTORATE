import { createStore, combineReducers } from 'redux';
import * as Reducers from '../reducers';

const { error, network, accounts} = Reducers;

const app = combineReducers({
  error,
  network,
  accounts
});

export const store = createStore(app);
