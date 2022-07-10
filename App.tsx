import React from 'react';
import AppNavigator from '@navigators/app.navigator';
import { AuthStackParamList } from '@navigators/auth.navigator';
import { MainStackParamList } from '@navigators/main.navigator';
import { persistor, store } from '@redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-native-toast-notifications';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList, AuthStackParamList {}
  }
}

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
            <AppNavigator />
          </ToastProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
