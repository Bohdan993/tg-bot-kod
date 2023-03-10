import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    info: {}
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading(
      state,
      action
    ){
      state.loading = action.payload;
    },
    setCompanyInfo(
      state,
      action
    ) {
      state.info = {...state.info, ...action.payload};
    }
  }
});

export const { 
  setLoading, 
  setCompanyInfo, 
} = slice.actions;

export const { reducer } = slice;
