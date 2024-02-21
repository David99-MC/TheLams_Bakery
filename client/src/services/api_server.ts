import type { Order } from "../../../server/src/models/order"
import type { Cake } from "../../../server/src/models/cake"
// import jwt from "jsonwebtoken"

const BASE_URL = "http://localhost:5000/"

export async function getMenu() {
  const res = await fetch(BASE_URL + "api/menu")
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
  const res = await fetch(BASE_URL + `api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
  if (!res.ok) throw new Error("Failed to save order into db")
  const data = await res.json()
  return data
}

// async function registerUser(data: userInfo) {
//   const res = await fetch(BASE_URL + "api/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//   if (!res.ok) {
//     throw new Error("username already exists")
//   }
//   const user = await res.json()
//   return user
// }

// async function login(userData: userInfo) {
//   const requestedUser = await fetch(BASE_URL + `api/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   })
//   if (!requestedUser.ok) {
//     return {}
//   }

//   return requestedUser.json()
// }

// export const authService = {
//   registerUser,
//   login,
// }
