import {combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from '../Slices/app';
import { reducer as companyReducer } from '../Slices/company';
import { reducer as masterReducer } from '../Slices/master';
import { reducer as serviceReducer } from '../Slices/service';
import { reducer as dateReducer } from '../Slices/date';

const combinedReducer = combineReducers({
  app: appReducer,
  company: companyReducer,
  master: masterReducer,
  service: serviceReducer,
  date: dateReducer
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};


export const resettableRootReducer = (state, action) => {
  if (action.type === 'store/reset') {
    const newState = {...state, company: undefined, master: undefined, service: undefined, date: undefined};
    return rootReducer(newState, action);
  }
  return rootReducer(state, action);
}