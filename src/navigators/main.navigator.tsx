import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { SCREEN_NAME } from '@utils/constants/screen_name';
import Home from '@screens/home';
import { Pressable } from 'react-native';
import SignOutIcon from '@components/Icons/SignOut';
import { useAppDispatch } from '@hooks/reduxHooks';
import { logout } from '@redux/slices/auth_slice';

export type MainStackParamList = {
  Home: undefined;
};

export type MainStackNavigationProps =
  NativeStackNavigationProp<MainStackParamList>;

const MainStack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  const dispatch = useAppDispatch();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: 'white',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#AEC57D',
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <MainStack.Screen
        name={SCREEN_NAME.MAIN.HOME as keyof MainStackParamList}
        component={Home}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <Pressable onPress={() => dispatch(logout())}>
              <SignOutIcon />
            </Pressable>
          ),
        })}
      />
    </MainStack.Navigator>
  );
}
