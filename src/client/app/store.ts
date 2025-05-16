import { configureStore } from '@reduxjs/toolkit';
import expressionInputReducer from '../features/expression/expression-input.slice';
import LogsReducer from '../features/logs/logs.slice';
import GraphReducer from '../features/graph/graph-points.slice';
import AsideOpenedReducer from '../features/aside/aside.slice';
import SolutionReducer from '../features/solution/solution.slice';

export const store = configureStore({
  reducer: {
    expressionInput: expressionInputReducer,
    logs: LogsReducer,
    graph: GraphReducer,
    asideOpened: AsideOpenedReducer,
    solution: SolutionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
