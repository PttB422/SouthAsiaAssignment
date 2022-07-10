import Card from '@components/Card';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import InputField from '@components/InputField';
import Button from '@components/Button';
import DropDownField from '@components/DownDropField';
import DatePicker from 'react-native-date-picker';
import CloseIcon from '@components/Icons/CloseIcon';
import { useCreateBookingMutation } from '@redux/modules/booking';
import { selectAuth } from '@redux/slices/auth_slice';
import { useAppSelector } from '@hooks/reduxHooks';
import { useToast } from 'react-native-toast-notifications';

type FormValues = {
  event_title: string;
  event_location: string;
  confirmed_datetime: string;
};

const validationSchema = Yup.object().shape({
  event_title: Yup.string().required('Event title is a required field'),
  event_location: Yup.string()
    .required('Event location is a required field')
    .min(3, 'Event location must be at least 3 characters')
    .test(
      'valid-location-name',
      'Cannot contain leading or trailing spaces, only 1 space between words and must contain letter',
      (value) => {
        /**This regex disallow leading, trailing spaces, special character, number only.
         * Allow only 1 space between words
         */
        return /^(?!\s)(?!.*\s$)(?=.*[\p{L}])[\p{L}0-9,.'-]+(\s[\p{L}0-9,.'-]+)*?$/gu.test(
          value!,
        );
      },
    ),
  confirmed_datetime: Yup.string().required(
    'Confirmed DateTime is a required field',
  ),
});

const AddBookingModal = ({
  visible,
  toggleVisible,
}: {
  visible: boolean;
  toggleVisible: () => void;
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onBlur',
  });
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const toast = useToast();
  const { username } = useAppSelector(selectAuth);
  const [dateModalVisible, setDateModalVisible] = useState(() => false);
  const toggleDateModalVisible = () => setDateModalVisible((prev) => !prev);
  const watchConfirmDateTime = watch('confirmed_datetime');
  const watchEventTitle = watch('event_title');
  const onCreateBookingPress = async (values: FormValues) => {
    if (isLoading) {
      return;
    }
    try {
      const result = await createBooking({
        ...values,
        created_at: new Date().toUTCString(),
        created_by: username,
      }).unwrap();
      if (result === 'Success') {
        toast.show(result);
        reset();
        toggleVisible();
      }
    } catch (error) {}
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Card>
          <View
            style={{
              alignSelf: 'flex-end',
              padding: 8,
            }}>
            <Pressable
              onPress={() => {
                reset();
                toggleVisible();
              }}>
              <CloseIcon />
            </Pressable>
          </View>
          <DropDownField
            data={[
              { event_title: 'Health Talk' },
              { event_title: 'Wellness Event' },
              { event_title: 'Fitness Activities' },
            ]}
            errors={errors}
            fieldLabel="Event Title"
            fieldName="event_title"
            labelField="event_title"
            valueField="event_title"
            control={control}
            value={watchEventTitle}
          />
          <InputField
            control={control}
            fieldName={'event_location'}
            errors={errors}
            fieldLabel="Event Location"
          />
          <Text
            style={[
              styles.label,
              { color: errors.confirmed_datetime ? '#F66D6D' : '#000' },
            ]}>
            Confirmed DateTime
          </Text>
          <Pressable onPress={toggleDateModalVisible}>
            <Text
              style={[
                styles.input,
                { borderColor: errors.confirmed_datetime ? '#F66D6D' : '#ddd' },
              ]}>
              {watchConfirmDateTime &&
                new Date(watchConfirmDateTime)?.toLocaleString()}
            </Text>
            {errors.confirmed_datetime && (
              <Text style={styles.errorMsg}>
                {errors.confirmed_datetime.message}
              </Text>
            )}
          </Pressable>
          <Button
            title="Create Booking"
            onPress={handleSubmit(onCreateBookingPress)}
            buttonStyle={{ marginVertical: 8 }}
          />
        </Card>
        <DatePicker
          modal
          open={dateModalVisible}
          mode="datetime"
          minimumDate={new Date()}
          date={new Date()}
          onConfirm={(date) => {
            setValue('confirmed_datetime', date.toUTCString());
            setDateModalVisible(false);
            clearErrors('confirmed_datetime');
          }}
          onCancel={() => {
            setDateModalVisible(false);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 8,
    color: '#000',
  },
  label: {
    paddingHorizontal: 12,
  },
  errorMsg: {
    color: '#F66D6D',
    fontSize: 12,
    paddingHorizontal: 12,
  },
});

export default AddBookingModal;
