import { configureStore } from '@reduxjs/toolkit';
import expressionInputReducer from '../features/function/expression-input.slice';
import LogsReducer from '../features/logs/logs.slice';

export const store = configureStore({
  reducer: {
    expressionInput: expressionInputReducer,
    logs: LogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
