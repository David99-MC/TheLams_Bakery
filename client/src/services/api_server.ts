import type { Order } from "../../../server/src/models/order"

const BASE_URL = "http://localhost:5000/"

export async function getMenu() {
  const res = await fetch(BASE_URL + "menu")
  //the caller will catch this error
  if (!res.ok) throw new Error("Failed to fetch the menu")
  const data = await res.json()
  return data
}

export async function getOrderById(id: string) {
  const res = await fetch(BASE_URL + `order/${id}`)
  if (!res.ok) throw new Error("Can't find that order")
  const data = await res.json()
  return data
}

export async function createNewOrder(order: Order) {
  // order object is stringified
  const res = await fetch(BASE_URL + `order`, {
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
