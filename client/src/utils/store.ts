import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../services/api_slice"
import userReducer from "../features/user/userSlice"
import cartReducer from "../features/cart/cartSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
})

export default store

// ref: https://redux-toolkit.js.org/usage/usage-with-typescript

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {user: UserState, cart: CartState}

export type RootState = ReturnType<typeof store.getState>
export type AppDisPatch = typeof store.dispatch
