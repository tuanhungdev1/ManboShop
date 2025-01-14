import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { rootApi } from "@services/rootApi";
import snackbarReducer from "@redux/slices/snackbarSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
