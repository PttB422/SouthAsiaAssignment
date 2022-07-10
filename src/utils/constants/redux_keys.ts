const REDUX_KEYS = {
  PERSIST_KEY: 'root',
  AUTH_REDUCER: 'authentication',
  LOADER_REDUCER: 'loader',
  BOOKING_REDUCER: 'booking',
};

const STORAGE_KEY = {
  REDUX_PERSIST_STORAGE: 'REDUX_PERSIST_STORAGE',
};

Object.freeze(REDUX_KEYS);
Object.freeze(STORAGE_KEY);

export { REDUX_KEYS, STORAGE_KEY };
