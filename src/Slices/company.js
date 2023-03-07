import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeCompany: null,
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveCompany(
      state,
      action
    ) {
      state.activeCompany = action.payload;
    }
  }
});

export const { 
    setActiveCompany
} = slice.actions;

export const { reducer } = slice;
