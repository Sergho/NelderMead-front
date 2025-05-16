import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSolution } from './get-solution.thunk';
import { Status } from '../../types/enums/status.enum';
import { Dimension } from '../../types/enums/dimension.enum';

interface SimplexState {
  simplexes: { x: number[]; y: number[]; z?: number[] }[];
  dimension: Dimension;
  activeIndex: number;
  status: Status;
  error: string | null;
}

const initialState: SimplexState = {
  simplexes: [],
  dimension: Dimension.Unsupported,
  activeIndex: 0,
  status: Status.Idle,
  error: null,
};

export const SimplexSlice = createSlice({
  name: 'simplex',
  initialState,
  reducers: {
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSolution.pending, (state) => {
      state.status = Status.Loading;
      state.error = null;
    });
    builder.addCase(fetchSolution.rejected, (state, action) => {
      state.status = Status.Failed;
      state.error = action.payload.message;
    });
    builder.addCase(fetchSolution.fulfilled, (state, action) => {
      state.status = Status.Success;
      state.simplexes = action.payload.simplexes;
      state.activeIndex = 0;
    });
  },
});

export const { setActiveIndex } = SimplexSlice.actions;

export default SimplexSlice.reducer;
