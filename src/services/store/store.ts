import { configureStore } from "@reduxjs/toolkit";
import {api} from "../apiSlide/api";
import { scholarApi } from "@/redux/service/scholarApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [scholarApi.reducerPath]: scholarApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, scholarApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
