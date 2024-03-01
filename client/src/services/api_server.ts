import type { CartItemType } from "../features/cart/Cart"
import { setCredentials } from "../features/user/userSlice"
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

const API_URL = "https://thelamsbakery-api.onrender.com/" // "http://localhost:5000/"

// credentials: "include" is used to send cookies

async function fetchBaseQuery(path: string, method?: string, body?: object) {
  const accessToken = store.getState().user.accessToken
  let res = null
  if (path === "api/refreshToken") {
    res = await fetch(API_URL + path, {
      credentials: "include",
      // headers: {
      //   "cache-control": "no-cache",
      //   "X-Content-Type-Options": "nosniff",
      // },
    })
  } else if (method === "GET" || method === "DELETE") {
    res = await fetch(API_URL + path, {
      method: method,
      headers: {
        authorization: `Bearer ${accessToken}`,
        // "cache-control": "max-age=31536000, immutable",
        // "X-Content-Type-Options": "nosniff",
      },
      credentials: "include",
    })
  } else {
    // POST or PUT
    res = await fetch(API_URL + path, {
      method: method,
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        // "cache-control": "max-age=31536000, immutable",
        // "X-Content-Type-Options": "nosniff",
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
  }
  return res
}

async function fetchBaseQueryWithReauth(
  path: string,
  method?: string,
  body?: object
) {
  let result = await fetchBaseQuery(path, method, body)
  if (!result.ok && result.status === 403) {
    const refreshResult = await fetchBaseQuery("api/refreshToken")
    const { accessToken } = await refreshResult.json()
    if (accessToken) {
      console.log("refresh token success")
      const { fullName, isAdmin } = store.getState().user
      // store the new access token in the redux store (memory only)
      store.dispatch(
        setCredentials({
          fullName,
          isAdmin,
          accessToken,
        })
      )
      // Try the original request again with new access token
      result = await fetchBaseQuery(path, method, body)
    } else {
      throw new Error(`Error: ${result.status} - ${result.statusText}`)
    }
  }
  return result.json()
}

export async function getMenu() {
  const data = await fetchBaseQueryWithReauth("api/menu", "GET")
  return data as Cake[]
}

export async function getOrderById(id: string) {
  const data = await fetchBaseQueryWithReauth(`api/order/${id}`, "GET")
  return data as Order
}

export async function createNewOrder(order: Order) {
  const data = await fetchBaseQueryWithReauth("api/order", "POST", order)
  return data as Order
}

export async function getCartAsync() {
  const accessToken = store.getState().user.accessToken
  if (!accessToken) {
    return []
  }
  const data = await fetchBaseQueryWithReauth("api/cart", "GET")
  return data as CartItemType[]
}

export async function updateCartItemAsync(body: {
  item: CartItemType
  action: "add" | "remove" | "delete"
}) {
  const data = await fetchBaseQueryWithReauth(`api/cart`, "PUT", body)
  return data as { item: CartItemType; action: string }
}

export async function clearCartAsync() {
  const data = await fetchBaseQueryWithReauth(`api/cart`, "DELETE")
  return data as { message: string }
}
