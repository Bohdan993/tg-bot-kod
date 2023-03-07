import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedDate: null,
    selectedTime: null
};

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
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
  setSelectedDate,
  setSelectedTime
} = slice.actions;

export const { reducer } = slice;
