import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./slice/AuthSlice";
import { CounterSlice } from "./slice/CounterSlice";

const store = configureStore({
  reducer: {
    counter: CounterSlice.reducer,
    auth: AuthSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
