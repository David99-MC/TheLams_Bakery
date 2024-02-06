import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import cartReducer from "../features/cart/cartSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {user: UserState, cart: CartState}

export type RootState = ReturnType<typeof store.getState>
export type AppDisPatch = typeof store.dispatch
