import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SimplexState {
  simplexes: number[][][];
  activeIndex: number;
}

const initialState: SimplexState = {
  simplexes: [],
  activeIndex: 0,
};

export const SimplexSlice = createSlice({
  name: 'simplex',
  initialState,
  reducers: {
    setSimplexes: (state, action: PayloadAction<number[][][]>) => {
      state.simplexes = action.payload;
      state.activeIndex = state.simplexes ? 0 : null;
    },
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { setSimplexes, setActiveIndex } = SimplexSlice.actions;

export default SimplexSlice.reducer;
