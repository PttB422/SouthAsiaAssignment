import { apiSlice } from '@redux/apiSlice';
import { RootState } from '@redux/store';
import { createSlice } from '@reduxjs/toolkit';
import { REDUX_KEYS } from '@utils/constants/redux_keys';
import { AuthCredentials } from '../auth_slice/authSlice.type';
import {
  BookingResponse,
  BookingState,
  CreateBookingPayload,
} from './bookingSlice.type';

export const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: REDUX_KEYS.AUTH_REDUCER,
  initialState,
  reducers: {
    getBookings() {},
  },
});

export const { getBookings } = bookingSlice.actions;

export const selectBooking = (state: RootState) => state.booking;

export default bookingSlice.reducer;
