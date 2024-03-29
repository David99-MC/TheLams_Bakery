import { useParams } from "react-router-dom"

import OrderItem from "./OrderItem"
import { getOrderById } from "../../services/api_server"

import Loader from "../../ui/Loader"
import ErrorNode from "../../ui/ErrorNode"
import type { CartItemType } from "../cart/Cart"
import { useQuery } from "@tanstack/react-query"

function Order() {
  const { orderId } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId || ""),
  })

  // Not typed correctly
  const {
    _id,
    status,
    priority,
    orderPrice = 0,
    priorityPrice = 0,
    cart = [],
  } = data ?? {}

  if (isLoading) return <Loader />
  if (!data || (data && !data._id))
    return <ErrorNode message={`Can't find your order # ${orderId} 😢`} />

  return (
    <>
      <div className="space-y-8 px-5 py-6">
        <div className="item-center flex flex-wrap justify-between gap-3">
          <h2 className="text-xl font-bold">Order # {_id} status</h2>

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
            Please allow up to 30 minutes for delivery
          </p>
          <p className="text-sm text-stone-500">
            (Estimated delivery: 25 mins)
          </p>
        </div>

        <ul className="divide-y divide-stone-200 border-b border-t">
          {cart?.map((item: CartItemType) => (
            <OrderItem key={item.productID} {...item} />
          ))}
        </ul>

        <div className="bg-stone-200 p-4">
          <p className="text-sm font-medium">
            Products total: ${orderPrice.toFixed(2)}
          </p>
          {priority && (
            <p className="text-sm font-medium">
              Priority order: ${priorityPrice.toFixed(2)}
            </p>
          )}
          <p className="font-bold">
            To pay on delivery: ${(orderPrice + priorityPrice).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  )
}

export default Order
