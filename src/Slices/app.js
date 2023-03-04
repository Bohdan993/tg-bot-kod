import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    info: {},
    // activeBranchId: null,
    activeMasterId: null,
    activeServiceId: null,
    activeRelatedServices: []
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
    },
    // setCompanyId(
    //   state,
    //   action
    // ) {
    //   state.activeBranchId = action.payload;
    // }
  }
});

export const { setLoading, setCompanyInfo } = slice.actions;

export const { reducer } = slice;
