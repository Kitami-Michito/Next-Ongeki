import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../slice/counterSlice';
import calculateReducer from '../slice/getScoreslice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    calculate: calculateReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
