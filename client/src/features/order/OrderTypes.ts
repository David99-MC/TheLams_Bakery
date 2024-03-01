import type { CartItemType } from "../cart/Cart"

export type Order = {
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
