import { combineReducers } from 'redux';
import app from './app/reducer';
import hc from './hc/reducer';

const createRootReducer = () =>
  combineReducers({
    app,
    hc,
  });

export default createRootReducer;
