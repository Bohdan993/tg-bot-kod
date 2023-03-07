import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeService: null,
    activeRelatedServices: null
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveService(
      state,
      action
    ) {
      state.activeService = action.payload;
    },
    setActiveRelatedServices(
      state,
      action
    ){
      state.activeService = action.payload;
    }
  }
});

export const { 
    setActiveService,
    setActiveRelatedServices
} = slice.actions;

export const { reducer } = slice;
