// Test ID: IIDSAT

import { calcMinutesLeft, formatDate } from "../../utils/helper"
import OrderItem from "./OrderItem"

type order = {
  id: string
  status: "Received" | "In oven" | "In Delivery" | "Delivered"
  customer: string
  phone: string
  address: string
  priority: boolean
  estimatedDelivery: string
  cart: {
    productID: number
    name: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }[]
  position: string
  orderPrice: number
  priorityPrice: number
}

const fakeOrder: order = {
  id: "ABCDEF",
  status: "Received",
  customer: "Buu",
  phone: "123456789",
  address: "Mesa, Az , USA",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      productID: 7,
      name: "Banh Chung",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      productID: 5,
      name: "Banh Chuoi",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      productID: 3,
      name: "Banh Dau Xanh",
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
}

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = fakeOrder
  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  return (
    <div className="space-y-8 px-5 py-6">
      <div className="item-center flex flex-wrap justify-between gap-3">
        <h2 className="text-xl font-bold">Order #{id} status</h2>

        <div className=" space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 p-2 font-semibold tracking-wide text-red-50">
              PRIORITY
            </span>
          )}
          <span className="rounded-full bg-green-500 p-2 font-semibold tracking-wide text-green-50">
            {status}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between bg-stone-200 p-4">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem key={item.productID} {...item} />
        ))}
      </ul>

      <div className="bg-stone-200 p-4">
        <p className="text-sm font-medium">Price pizza: ${orderPrice}</p>
        {priority && (
          <p className="text-sm font-medium">
            Price priority: ${priorityPrice}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: ${orderPrice + priorityPrice}
        </p>
      </div>
    </div>
  )
}

export default Order
