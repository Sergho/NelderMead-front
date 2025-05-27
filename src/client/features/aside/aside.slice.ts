import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AsideOpenedState {
  activeIndex: number | null;
}

const initialState: AsideOpenedState = {
  activeIndex: null,
};

export const AsideSlice = createSlice({
  name: 'aside',
  initialState,
  reducers: {
    setAsideActiveIndex: (state, action: PayloadAction<number | null>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const { setAsideActiveIndex } = AsideSlice.actions;

export default AsideSlice.reducer;
