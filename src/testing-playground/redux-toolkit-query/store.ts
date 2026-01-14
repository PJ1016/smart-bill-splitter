import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/usersApi";

export const playgroundStore = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof playgroundStore.getState>;
export type AppDispatch = typeof playgroundStore.dispatch;
