import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItemType } from "./Cart"
import type { RootState } from "../../utils/store"

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
    addItem: (state: CartState, action: PayloadAction<CartItemType>) => {
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
    deleteItem: (state: CartState, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productID !== action.payload
      )
    },
    incItem: (state: CartState, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (item) => item.productID === action.payload
      )
      if (item) {
        item.quantity += 1
      }
    },
    decItem: (state: CartState, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        (item) => item.productID === action.payload
      )
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },
    clearCart: (state: CartState) => {
      state.cartItems = []
    },
  },
})

// action creators to be used by other components
export const { addItem, deleteItem, incItem, decItem, clearCart } =
  cartSlice.actions

export default cartSlice.reducer

export const getCart = (state: RootState) => state.cart.cartItems

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  )

export const getTotalProducts = (state: RootState) =>
  state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)
