import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpressionInputState {
  expression: string;
}

const initialState: ExpressionInputState = {
  expression: '',
};

export const ExpressionInputSlice = createSlice({
  name: 'expressionInput',
  initialState,
  reducers: {
    setExpressionInput: (state, action: PayloadAction<string>) => {
      state.expression = action.payload;
    },
  },
});

export const { setExpressionInput } = ExpressionInputSlice.actions;

export default ExpressionInputSlice.reducer;
