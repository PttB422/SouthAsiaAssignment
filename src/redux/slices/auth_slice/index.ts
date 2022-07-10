import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';
import { REDUX_KEYS } from '@utils/constants/redux_keys';
import { AuthState } from './authSlice.type';
import { apiSlice } from '@redux/apiSlice';

export const initialState: AuthState = {
  isAuthenticated: false,
  username: '',
};

const authSlice = createSlice({
  name: REDUX_KEYS.AUTH_REDUCER,
  initialState,
  reducers: {
    logout() {},
    getAuth() {},
    setAuth(state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
  },
});

export const { getAuth, setAuth, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authentication;

export default authSlice.reducer;
