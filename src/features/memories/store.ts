import { configureStore } from "@reduxjs/toolkit";
import { memoriesApi } from "./memoriesApi";
import { graphApi } from "../graph/graphApi";

export const store = configureStore({
  reducer: {
    [memoriesApi.reducerPath]: memoriesApi.reducer,
    [graphApi.reducerPath]: graphApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(memoriesApi.middleware)
      .concat(graphApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
