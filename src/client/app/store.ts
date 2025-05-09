import { configureStore } from '@reduxjs/toolkit';
import expressionInputReducer from '../features/function/expression-input.slice';
import LogsReducer from '../features/logs/logs.slice';
import GraphPointsReducer from '../features/graph/graph-points.slice';

export const store = configureStore({
  reducer: {
    expressionInput: expressionInputReducer,
    logs: LogsReducer,
    graphPoints: GraphPointsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
