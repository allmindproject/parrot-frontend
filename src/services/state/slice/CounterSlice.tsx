import { createSlice } from "@reduxjs/toolkit";

export const CounterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0 },
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
  },
});

export const CounterActions = CounterSlice.actions;
