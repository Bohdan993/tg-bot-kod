import {combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from '../Slices/app';

const combinedReducer = combineReducers({
  app: appReducer
});

export const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};
