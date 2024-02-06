import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItemType } from "./Cart"

type CartState = {
  cart: CartItemType[]
}

const initialState: CartState = {
  cart: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      state.cart.push(action.payload)
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (item) => item.productID !== action.payload
      )
    },
    incItem: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.productID === action.payload)
      if (item && item.quantity > 0) {
        item.quantity += 1
      }
    },
    decItem: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.productID === action.payload)
      if (item && item.quantity > 0) {
        item.quantity -= 1
      }
    },
    clearCart: (state) => {
      state.cart = []
    },
  },
})

// action creators to be used by other components
export const { addItem, deleteItem, incItem, decItem, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
