import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeMaster: null,
    selectedMasterId: 0
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveMaster(
      state,
      action
    ) {
      state.activeMaster = action.payload;
    },
    setSelectedMasterId(
      state,
      action
    ) {
      state.selectedMasterId = action.payload;
    }
  }
});

export const { 
    setActiveMaster,
    setSelectedMasterId
} = slice.actions;

export const { reducer } = slice;
