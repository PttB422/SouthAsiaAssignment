import React from 'react';
import AuthNavigator from './auth.navigator';
import { NavigationContainer } from '@react-navigation/native';
import { selectAuth } from '@redux/slices/auth_slice';
import { useAppSelector } from '@hooks/reduxHooks';
import MainNavigator from './main.navigator';
import LoadingOverlay from '@components/LoadingOverlay';
import { selectLoader } from '@redux/slices/loader_slice';

const AppNavigator = () => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { isLoading } = useAppSelector(selectLoader);
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
      <LoadingOverlay isLoading={isLoading} />
    </NavigationContainer>
  );
};

export default AppNavigator;
