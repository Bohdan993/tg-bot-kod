import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    info: {},
    activeBranchId: null,
    activeMaster: null,
    activeService: null,
    activeRelatedServices: null
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
    setCompanyId(
      state,
      action
    ) {
      state.activeBranchId = action.payload;
    },
    setActiveMaster(
      state,
      action
    ) {
      state.activeMaster = action.payload;
    },
    setActiveService(
      state,
      action
    ) {
      state.activeService = action.payload;
    },
    setActiveRelatedServices(
      state,
      action
    ) {
      state.activeRelatedServices = action.payload;
    }
  }
});

export const { 
  setLoading, 
  setCompanyInfo, 
  setCompanyId, 
  setActiveService, 
  setActiveMaster, 
  setActiveRelatedServices 
} = slice.actions;

export const { reducer } = slice;
