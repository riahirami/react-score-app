import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface GlobalState {
  isAuthenticated: boolean;
}

const initialState: GlobalState = {
  isAuthenticated: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { setIsAuthenticated } = globalSlice.actions;

export default globalSlice;
