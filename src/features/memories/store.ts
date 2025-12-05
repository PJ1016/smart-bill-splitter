import { configureStore } from '@reduxjs/toolkit';
import { memoriesApi } from './memoriesApi';

export const store = configureStore({
  reducer: {
    [memoriesApi.reducerPath]: memoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(memoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;