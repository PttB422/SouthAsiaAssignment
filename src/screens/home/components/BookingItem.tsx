import Card from '@components/Card';
import HorizontalLabelText from '@components/HorizontalLabelText';
import { BookingResponse } from '@redux/slices/booking_slice/bookingSlice.type';
import React, { memo } from 'react';
import { Text } from 'react-native';

const BookingItem = ({ item }: { item: BookingResponse }) => {
  return (
    <Card>
      <HorizontalLabelText label="Event title" text={item.event_title} />
      <HorizontalLabelText label="Event location" text={item.event_location} />
      <HorizontalLabelText
        label="Confirmed datetime"
        text={new Date(
          item.confirmed_datetime.replace(/ /, 'T'),
        ).toLocaleString()}
      />
      <HorizontalLabelText label="Created by" text={item.created_by} />
    </Card>
  );
};

export default memo(BookingItem);
