import { useParams } from "react-router-dom"
import { calcMinutesLeft, formatDate } from "../../utils/helper"
import OrderItem from "./OrderItem"
import { useQuery } from "@tanstack/react-query"
import { getOrderById } from "../../services/api_server"
import Loader from "../../ui/Loader"
import ErrorNode from "../../ui/ErrorNode"

type cart = {
  productID: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { orderID } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderID],
    queryFn: orderID ? () => getOrderById(orderID) : undefined,
  })
  console.log("data:", data)
  // console.log("order:", order, "error:", error)

  const {
    _id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = data

  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  return (
    <>
      {isLoading && <Loader />}
      {error !== null && <ErrorNode message="Can't find your order 😢" />}
      {!isLoading && error === null && (
        <div className="space-y-8 px-5 py-6">
          <div className="item-center flex flex-wrap justify-between gap-3">
            <h2 className="text-xl font-bold">Order #{_id} status</h2>

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
            {cart.map((item: cart) => (
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
      )}
    </>
  )
}

export default Order
