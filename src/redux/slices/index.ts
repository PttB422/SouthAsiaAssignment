import authReducer, { initialState as authInitialState } from './auth_slice';
import loaderReducer, {
  initialState as loaderInitialState,
} from './loader_slice';
import bookingReducer, {
  initialState as bookingInitialState,
} from './booking_slice';
import { combineReducers } from 'redux';
import { REDUCER_ACTIONS } from '@utils/constants/reducer_actions';
import { RootState } from '@redux/store';
import { AnyAction, Reducer } from '@reduxjs/toolkit';
import { apiSlice } from '@redux/apiSlice';

export const combinedReducer = combineReducers({
  authentication: authReducer,
  loader: loaderReducer,
  booking: bookingReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === REDUCER_ACTIONS.AUTH_LOGOUT) {
    state = {
      authentication: authInitialState,
      api: state.api,
      booking: bookingInitialState,
      loader: loaderInitialState,
    };
  }
  return combinedReducer(state, action);
};

export default rootReducer;
