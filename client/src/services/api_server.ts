import type { CartItemType } from "../features/cart/Cart"
import store from "../utils/store"

type Order = {
  _id?: string
  status: "Unknown" | "Received" | "In Progress" | "In Delivery" | "Delivered"
  customerName: string
  phone: string
  address: string
  priority: boolean
  cart: CartItemType[]
  orderPrice: number
  priorityPrice: number
}

type Cake = {
  _id?: string
  vietnameseName: string
  englishName?: string
  imgUrl?: string
  unitPrice: number
  ingredients: string
  soldOut: boolean
}

const BASE_URL = "http://localhost:5000/"

// credentials: "include" is used to send cookies

export async function getMenu() {
  const accessToken = store.getState().user.accessToken
  const res = await fetch(BASE_URL + "api/menu", {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  })
  //the caller will catch this error
  if (!res.ok) throw new Error("Failed to fetch the menu")
  const data = await res.json()
  return data as Cake[]
}

export async function getOrderById(id: string) {
  const res = await fetch(BASE_URL + `api/order/${id}`)
  if (!res.ok) throw new Error("Can't find that order")
  const data = await res.json()
  return data as Order
}

export async function createNewOrder(order: Order) {
  // order object is stringified
  const accessToken = store.getState().user.accessToken
  const res = await fetch(BASE_URL + `api/order`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(order),
  })
  if (!res.ok) throw new Error("Failed to save order into db")
  const data = await res.json()
  return data
}
