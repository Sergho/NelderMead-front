import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValuedGraphPoint } from '../../../common/types/ValuedGraphPoint';

interface GraphPointsState {
  points: ValuedGraphPoint[];
}

const initialState: GraphPointsState = {
  points: [],
};

export const GraphPointsSlice = createSlice({
  name: 'graphDots',
  initialState,
  reducers: {
    setGraphPoints: (state, action: PayloadAction<ValuedGraphPoint[]>) => {
      state.points = action.payload;
    },
  },
});

export const { setGraphPoints } = GraphPointsSlice.actions;

export default GraphPointsSlice.reducer;
