import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { SCREEN_NAME } from '@utils/constants/screen_name';
import Login from '@screens/login';

export type AuthStackParamList = {
  Login: undefined;
};

export type AuthStackNavigationProps =
  NativeStackNavigationProp<AuthStackParamList>;

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name={SCREEN_NAME.AUTH.LOGIN as keyof AuthStackParamList}
        component={Login}
      />
    </AuthStack.Navigator>
  );
}
