import { configureStore } from '@reduxjs/toolkit';
import InputReducer from '../features/inputs/inputs.slice';
import LogsReducer from '../features/logs/logs.slice';
import GraphReducer from '../features/graph/graph.slice';
import AsideOpenedReducer from '../features/aside/aside.slice';
import SolutionReducer from '../features/solution/solution.slice';

export const store = configureStore({
  reducer: {
    inputs: InputReducer,
    logs: LogsReducer,
    graph: GraphReducer,
    aside: AsideOpenedReducer,
    solution: SolutionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
