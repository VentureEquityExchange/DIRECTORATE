import { createStore, combineReducers } from 'redux';
import { error, network, accounts } from '../reducers';

const app = combineReducers({
  error,
  network,
  accounts
});

export const store = createStore(app);
