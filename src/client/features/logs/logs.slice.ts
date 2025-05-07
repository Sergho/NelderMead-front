import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LogsState {
  logs: string;
}

const initialState: LogsState = {
  logs: '',
};

export const LogsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<string>) => {
      state.logs = action.payload;
    },
  },
});

export const { setLogs } = LogsSlice.actions;

export default LogsSlice.reducer;
