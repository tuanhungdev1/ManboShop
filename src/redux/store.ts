import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import { baseApi } from "@services/baseApi";
import snackbarReducer from "@redux/slices/snackbarSlice";
import filterReducer from "./slices/filterSlice";
import backdropReducer from "./slices/backdropSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken", "user"],
};

const checkoutPersistConfig = {
  key: "checkout",
  storage,
  whitelist: [
    "activeStep",
    "selectedAddressId",
    "newAddress",
    "paymentMethod",
    "note",
    "existingAddresses",
  ],
};
// const cartPersistConfig = {
//   key: "cart",
//   storage,
//   whitelist: ["items", "total"] // Chọn các trường muốn lưu của cart
// };

// const filterPersistConfig = {
//   key: "filter",
//   storage,
//   whitelist: ["currentFilter", "savedFilters"] // Chọn các trường muốn lưu của filter
// };

// const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
// const persistedFilterReducer = persistReducer(filterPersistConfig, filterReducer);

// export const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer,
//     cart: persistedCartReducer,
//     filter: persistedFilterReducer,
//     [baseApi.reducerPath]: baseApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER
//         ]
//       }
//     }).concat(baseApi.middleware),
// });

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCheckoutReducer = persistReducer(
  checkoutPersistConfig,
  checkoutReducer
);
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    snackbar: snackbarReducer,
    filter: filterReducer,
    backdrop: backdropReducer,
    cart: cartReducer,
    checkout: persistedCheckoutReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
