import { useParams } from "react-router-dom"
import { calcMinutesLeft, formatDate } from "../../utils/helper"
import OrderItem from "./OrderItem"
import { useQuery } from "@tanstack/react-query"
import { getOrderById } from "../../services/api_server"
import Loader from "../../ui/Loader"
import ErrorNode from "../../ui/ErrorNode"
import { type Order } from "../../../../server/src/models/order"

type cart = {
  productID: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

const fakeData = {
  _id: "123456",
  status: "In oven",
  customerName: "Buu",
  phone: "123456789",
  address: "Mesa, Az , USA",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      productID: "7",
      productName: "Banh Chung",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      productID: "5",
      productName: "Banh Chuoi",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      productID: "3",
      productName: "Banh Deo",
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
  const { orderId } = useParams()
  // const { data, isLoading } = useQuery(["order", orderId], () =>
  //   getOrderById(orderId || "")
  // )

  const { data, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId || ""),
  })

  console.log("data:", data)

  const {
    _id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = fakeData

  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  return (
    <>
      {isLoading && <Loader />}
      {/* {data?.message !== null && (
        <ErrorNode message="Can't find your order 😢" />
      )} */}
      {fakeData !== null && (
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
            <p className="text-sm font-medium">Products: ${orderPrice}</p>
            {priority && (
              <p className="text-sm font-medium">
                Priority order: ${priorityPrice}
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
