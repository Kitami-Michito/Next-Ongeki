import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { calculate } from '../slice/getScoreslice';

const rootReducer = combineReducers({
  calculate: calculate.reducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
