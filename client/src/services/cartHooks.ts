import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { clearCartAsync, getCartAsync, updateCartItemAsync } from "./api_server"
import toast from "react-hot-toast"
import { useAppDispatch } from "../utils/reduxHooks"
import {
  addItem,
  clearCart,
  decItem,
  deleteItem,
  incItem,
  setCart,
} from "../features/cart/cartSlice"
import type { CartItemType } from "../features/cart/Cart"

export function useGetCart() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartAsync,
    onSuccess: (data: CartItemType[]) => {
      queryClient.setQueryData(["cart"], data)
      dispatch(setCart(data))
    },
  })
  return { cartItems, isLoading }
}

export function useAddCartItem() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { mutate: addCartItem, isLoading: isAdding } = useMutation({
    mutationFn: updateCartItemAsync,
    onSuccess: (data: { item: CartItemType; action: string }) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      dispatch(addItem(data.item))
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
  return { addCartItem, isAdding }
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { mutate: updateCartItem, isLoading: isUpdating } = useMutation({
    mutationFn: updateCartItemAsync,
    onSuccess: (data: { item: CartItemType; action: string }) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      switch (data.action) {
        case "add":
          dispatch(incItem(data.item.productID))
          break
        case "remove":
          dispatch(decItem(data.item.productID))
          break
        case "delete":
          dispatch(deleteItem(data.item.productID))
          break
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
  return { updateCartItem, isUpdating }
}

export function useClearCart() {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { mutate: clearCartItems, isLoading: isClearing } = useMutation({
    mutationFn: clearCartAsync,
    onSuccess: (data: { message: string }) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      dispatch(clearCart())
      toast.success(data.message)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
  return { clearCartItems, isClearing }
}
