//@ts-ignore
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import rootReducer, { combinedReducer } from './slices';
import { apiSlice } from './apiSlice';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { REDUX_KEYS, STORAGE_KEY } from '@utils/constants/redux_keys';
import { reduxBatch } from '@manaflair/redux-batch';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const storage = createSensitiveStorage({
  keychainService: STORAGE_KEY.REDUX_PERSIST_STORAGE,
  sharedPreferencesName: STORAGE_KEY.REDUX_PERSIST_STORAGE,
});

export const persistConfig = {
  key: REDUX_KEYS.PERSIST_KEY,
  storage,
  whitelist: [REDUX_KEYS.AUTH_REDUCER],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: true,
    }).concat(apiSlice.middleware as Middleware);
    return middlewares;
  },
  enhancers: (defaultEnhancers) => [
    reduxBatch,
    ...defaultEnhancers,
    reduxBatch,
  ],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
