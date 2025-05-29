import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PARAMS_OPTIONS, SIMPLEX_OPTIONS } from '../../constants';
import { Params } from '../../../common/types/params';
import { SimplexParams } from '../../../common/types/simplex-params';

interface InputsState {
  expression: string;
  params: Params;
  startSimplex: SimplexParams;
}

const initialState: InputsState = {
  expression: '',
  params: {
    reflection: PARAMS_OPTIONS?.reflection?.default || null,
    expansion: PARAMS_OPTIONS?.expansion?.default || null,
    contraction: PARAMS_OPTIONS?.contraction?.default || null,
    homothety: PARAMS_OPTIONS?.homothety?.default || null,
    dispersion: PARAMS_OPTIONS?.dispersion?.default || null,
    iterationsLimit: PARAMS_OPTIONS?.iterationsLimit?.default || null,
  },
  startSimplex: {
    dimension: SIMPLEX_OPTIONS?.dimension.default || null,
    startPoint: SIMPLEX_OPTIONS?.startPoint?.default || null,
    simplexOffset: SIMPLEX_OPTIONS?.simplexOffset?.default || null,
  },
};

export const InputsSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setExpression: (state, action: PayloadAction<string>) => {
      state.expression = action.payload;
    },
    setParams: (state, action: PayloadAction<Partial<Params>>) => {
      Object.assign(state.params, action.payload);
    },
    setStartSimplex: (state, action: PayloadAction<Partial<SimplexParams>>) => {
      Object.assign(state.startSimplex, action.payload);
      if (state.startSimplex.startPoint.length > state.startSimplex.dimension) {
        state.startSimplex.startPoint = state.startSimplex.startPoint.splice(
          0,
          state.startSimplex.dimension,
        );
      }
      if (state.startSimplex.startPoint.length < state.startSimplex.dimension) {
        state.startSimplex.startPoint = state.startSimplex.startPoint.concat(
          Array(state.startSimplex.dimension - state.startSimplex.startPoint.length).fill(null),
        );
      }
    },
  },
});

export const { setExpression, setParams, setStartSimplex } = InputsSlice.actions;

export default InputsSlice.reducer;
