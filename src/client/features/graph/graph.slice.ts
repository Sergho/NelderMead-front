import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphPoints } from '../../../common/types/graph-points';
import { Dimension } from '../../types/enums/dimension.enum';
import { Status } from '../../types/enums/status.enum';
import { fetchGraph } from './fetch-graph.thunk';

interface GraphState {
  points: GraphPoints;
  dimension: Dimension;
  status: Status;
  error: string | null;
}

const initialState: GraphState = {
  points: {
    x: [],
    y: [],
  },
  dimension: Dimension.TwoD,
  status: Status.Idle,
  error: null,
};

export const GraphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGraph.pending, (state) => {
      state.status = Status.Loading;
      state.error = null;
    });
    builder.addCase(fetchGraph.rejected, (state, action) => {
      state.status = Status.Failed;
      state.error = action.payload.message;
    });
    builder.addCase(fetchGraph.fulfilled, (state, action) => {
      console.log(action);
      state.status = Status.Success;
      state.points = action.payload.points;
      if (action.payload.points?.z?.length) {
        state.dimension = Dimension.ThreeD;
      } else {
        state.dimension = Dimension.TwoD;
      }
    });
  },
});

export const { setStatus } = GraphSlice.actions;
export default GraphSlice.reducer;
