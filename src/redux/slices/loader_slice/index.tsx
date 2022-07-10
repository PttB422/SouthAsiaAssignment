import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REDUX_KEYS } from '@utils/constants/redux_keys';
import { RootState } from '@redux/store';
import { LoaderState, ToggleLoaderAction } from './loadSlice.type';

export const initialState: LoaderState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: REDUX_KEYS.LOADER_REDUCER,
  initialState,
  reducers: {
    toggleLoader(state, action: PayloadAction<ToggleLoaderAction>) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { toggleLoader } = loaderSlice.actions;

export const selectLoader = (state: RootState) => state.loader;

export default loaderSlice.reducer;
