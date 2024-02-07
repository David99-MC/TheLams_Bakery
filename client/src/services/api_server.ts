import { compareSync, genSaltSync, hashSync } from "bcrypt-ts"
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

type userInfo = {
  username: string
  password: string
}
export async function signUp(data: userInfo) {
  const salt = genSaltSync(10)
  const hash = hashSync(data.password, salt)

  const res = await fetch(BASE_URL + "user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: data.username, hash }),
  })
  if (!res.ok) {
    throw new Error("Error trying to sign up")
  }
  return res.json()
}

export async function login(data: userInfo) {
  const requestedUser = await fetch(BASE_URL + `user/${data.username}`, {
    method: "GET",
  })
  if (!requestedUser.ok) return false

  const user = await requestedUser.json()

  return user.hash && compareSync(data.password, user.hash)
}
