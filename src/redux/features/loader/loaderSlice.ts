import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

interface LoaderState {
  isVisible: boolean;
}

const initialState: LoaderState = {
  isVisible: false,
};

/**
 * Creates a slice for handling global loader state
 */
export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoaderVisible: (state: LoaderState) => {
      state.isVisible = true;
    },
    setLoaderInvisible: (state: LoaderState) => {
      state.isVisible = false;
    },
  },
});

// Export loader actions
export const { setLoaderVisible, setLoaderInvisible } = loaderSlice.actions;

// Export loader state selector
export const SelectLoader = (state: RootState): LoaderState => state.loader;

export default loaderSlice;
