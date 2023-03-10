import { configureStore } from '@reduxjs/toolkit';
import { resettableRootReducer as rootReducer } from './root-reducer';

export const store = configureStore({
    reducer: rootReducer
});



