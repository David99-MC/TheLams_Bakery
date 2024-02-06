import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItemType } from "./Cart"

type CartState = {
  cartItems: CartItemType[]
}

const initialState: CartState = {
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const itemToAdd: CartItemType = action.payload
      const item = state.cartItems.find(
        (item) => item.productID === itemToAdd.productID
      )
      if (item) {
        item.quantity++
      } else {
        state.cartItems.push(itemToAdd)
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productID !== action.payload
      )
    },
    incItem: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (item) => item.productID === action.payload
      )
      if (item && item.quantity > 0) {
        item.quantity += 1
      }
    },
    decItem: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (item) => item.productID === action.payload
      )
      if (item && item.quantity > 0) {
        item.quantity -= 1
      }
    },
    clearCart: (state) => {
      state.cartItems = []
    },
  },
})

// action creators to be used by other components
export const { addItem, deleteItem, incItem, decItem, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
