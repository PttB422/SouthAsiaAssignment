export type BookingResponse = {
  _id: string;
  event_title: string;
  event_location: string;
  confirmed_datetime: string;
  created_at: string;
  created_by: string;
};

export type GetBookingsPayload = {
  user: string;
};

export type CreateBookingPayload = {
  event_title: string;
  event_location: string;
  confirmed_datetime: string;
  created_at: string;
  created_by: string;
};

export type BookingState = {
  bookings: BookingResponse[];
};
