import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    startDate: null,
    selectedDate: null,
    selectedTime: null
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStartDate(
      state,
      action
    ){
      state.startDate = action.payload;
    },
    setSelectedDate(
      state,
      action
    ) {
      state.selectedDate = action.payload;
    },
    setSelectedTime(
      state,
      action
    ) {
      state.selectedTime = action.payload;
    },
  }
});

export const { 
  setStartDate,
  setSelectedDate,
  setSelectedTime
} = slice.actions;

export const { reducer } = slice;
