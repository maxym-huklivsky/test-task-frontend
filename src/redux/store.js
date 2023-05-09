import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import auth from './auth/slice';
import customers from './customer/slice';
import events from './events/slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(persistConfig, auth);

const store = configureStore({
  reducer: { auth: persistedAuthReducer, customers, events },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
