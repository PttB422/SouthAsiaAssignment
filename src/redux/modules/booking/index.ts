import { apiSlice } from '@redux/apiSlice';
import {
  BookingResponse,
  CreateBookingPayload,
  GetBookingsPayload,
} from '@redux/slices/booking_slice/bookingSlice.type';
import produce from 'immer';

const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ['BOOKING'] });
// Define a service using a base URL and expected endpoints
export const bookingApi = apiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<BookingResponse[], GetBookingsPayload>({
      query: (credentials) => ({
        url: 'https://u7b754tqv4.execute-api.ap-southeast-1.amazonaws.com/default/DeveloperTest_GetBookings',
        method: 'POST',
        body: credentials,
      }),
      providesTags: [{ type: 'BOOKING', id: 'LIST' }],
      transformResponse: (returnValue: BookingResponse[]) => {
        const sorted = produce(returnValue, (draftState) =>
          draftState.sort(
            (a, b) =>
              +new Date(b.created_at.replace(/ /, 'T')) -
              +new Date(a.created_at.replace(/ /, 'T')),
          ),
        );
        return sorted;
      },
    }),
    createBooking: builder.mutation<string, CreateBookingPayload>({
      query: (credentials) => ({
        url: 'https://d0irjg216a.execute-api.ap-southeast-1.amazonaws.com/default/DeveloperTest_CreateBooking',
        method: 'POST',
        body: credentials,
        responseHandler: 'text',
      }),
      invalidatesTags: [{ type: 'BOOKING', id: 'LIST' }],
    }),
  }),
});

/**
 *  Export hooks for usage in functional components, which are
 *  auto-generated based on the defined endpoints
 */
export const { useCreateBookingMutation, useGetBookingsQuery } = bookingApi;
