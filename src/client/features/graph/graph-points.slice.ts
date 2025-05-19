import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GraphState {
  x: number[];
  y: number[];
  z?: number[];
}

const initialState: GraphState = {
  x: [],
  y: [],
  z: null,
};

export const GraphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setGraphPoints: (state, action: PayloadAction<GraphState>) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.z = action.payload.z;
    },
  },
});

export const { setGraphPoints } = GraphSlice.actions;

export default GraphSlice.reducer;
