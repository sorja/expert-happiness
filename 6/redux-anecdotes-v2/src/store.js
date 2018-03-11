import { createStore, combineReducers } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const store = createStore(combineReducers({
  notifications: notificationReducer,
  anecdotes: anecdoteReducer,
}));

export default store;
