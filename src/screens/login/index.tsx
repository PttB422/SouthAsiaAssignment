import Button from '@components/Button';
import Card from '@components/Card';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from '@components/InputField';
import { useToast } from 'react-native-toast-notifications';
import { useAppDispatch } from '@hooks/reduxHooks';
import { useLoginMutation } from '@redux/modules/auth';
import { setAuth } from '@redux/slices/auth_slice';
import withKeyboardDismiss from '@components/HOCs/withKeyboardDismiss';

type FormValues = {
  username: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().email('Invalid email').required().min(3).max(255),
  //both provided password have 8 characters so i'll assumed that the min length is 8
  password: Yup.string().required().min(8).max(255),
});

const Login = () => {
  const [login, { isError, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });
  const onLoginPress = async (values: FormValues) => {
    try {
      const result = await login(values).unwrap();
      if (result === 'Success') {
        dispatch(setAuth({ isAuthenticated: true, username: values.username }));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    isError && error && 'data' in error && toast.show(`${error?.data}`);
  }, [isError]);

  return (
    <View style={styles.container}>
      <Card>
        <InputField
          control={control}
          fieldName={'username'}
          errors={errors}
          fieldLabel="Email"
        />
        <InputField
          control={control}
          fieldName={'password'}
          errors={errors}
          fieldLabel="Password"
          inputProp={{
            secureTextEntry: true,
          }}
        />
      </Card>
      <Button title="Login" onPress={handleSubmit(onLoginPress)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default withKeyboardDismiss(Login);
