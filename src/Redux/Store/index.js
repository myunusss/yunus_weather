import { weatherReducer } from '../Reducers/WeatherReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"

const rootReducer = combineReducers(
  {
    weatherReducer
  }
);

export default createStore(rootReducer, applyMiddleware(thunk));