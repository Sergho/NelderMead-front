import { createSlice } from '@reduxjs/toolkit';
import { fetchSolution } from '../solution/fetch-solution.thunk';

interface LogsState {
  logs: string;
  isError: boolean;
}

const initialState: LogsState = {
  logs: '',
  isError: false,
};

export const LogsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolution.fulfilled, (state, action) => {
        const simplexes = action.payload.simplexes.map((simplex) => {
          const points: string[] = [];
          for (let i = 0; i < simplex.coords[0].length; i++) {
            const point: number[] = [];
            for (const values of simplex.coords) {
              point.push(values[i]);
            }
            point.push(simplex.values[i]);
            points.push(`[${point.map((num) => num.toFixed(4)).join(', ')}]`);
          }
          return points.join(' - ');
        });

        state.logs = simplexes.join('\n');
      })
      .addCase(fetchSolution.pending, (state) => {
        state.isError = false;
      })
      .addCase(fetchSolution.rejected, (state, action) => {
        state.logs = JSON.stringify(action.payload, null, 2);
        state.isError = true;
      });
  },
});

export default LogsSlice.reducer;
