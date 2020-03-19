import { combineReducers } from 'redux';
import app from './app/reducer';
import hc from './hc/reducer';
import agent from './agent/reducer';

const createRootReducer = () =>
  combineReducers({
    app,
    hc,
    agent,
  });

export default createRootReducer;
