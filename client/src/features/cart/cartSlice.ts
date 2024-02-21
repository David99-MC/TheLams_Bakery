import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItemType } from "./Cart"
import type { RootState } from "../../utils/store"
import { apiSlice } from "../../services/api_slice"

type CartState = {
  cartItems: CartItemType[]
}

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSession: builder.query({
      query: (sessionId) => ({
        url: `/api/session/${sessionId}`,
        method: "GET",
      }),
    }),
    addAnItem: builder.mutation({
      query: (data: CartItemType) => ({
        url: "/api/cart",
        method: "POST",
        body: data,
      }),
    }),
    deleteAnItem: builder.mutation({
      query: (productId: string) => ({
        url: `/api/cart/${productId}`,
        method: "DELETE",
      }),
    }),
    incAnItem: builder.mutation({
      query: (productId: string) => ({
        url: `/api/cart/${productId}/inc`,
        method: "PUT",
      }),
    }),
    decAnItem: builder.mutation({
      query: (productId: string) => ({
        url: `/api/cart/${productId}/dec`,
        method: "PUT",
      }),
    }),
  }),
})

const cart: CartItemType[] = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "[]")
  : []

const initialState: CartState = {
  cartItems: cart || [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state: CartState, action: PayloadAction<CartItemType[]>) => {
      state.cartItems = action.payload
      localStorage.setItem("cart", JSON.stringify(action.payload))
    },
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
      localStorage.removeItem("cart")
    },
  },
})

// action creators to be used by other components
export const { addItem, deleteItem, incItem, decItem, clearCart } =
  cartSlice.actions

export const {
  useGetSessionQuery,
  useAddAnItemMutation,
  useDeleteAnItemMutation,
  useIncAnItemMutation,
  useDecAnItemMutation,
} = cartApiSlice

export default cartSlice.reducer

export const getCart = (state: RootState) => state.cart.cartItems

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  )

export const getTotalProducts = (state: RootState) =>
  state.cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)
