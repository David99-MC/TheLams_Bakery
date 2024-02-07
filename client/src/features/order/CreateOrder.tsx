import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks"
import { useForm } from "react-hook-form"

import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice"
import type { CartItemType } from "../cart/Cart"
import { OrderStatus, type Order } from "../../../../server/src/models/order"
import { createNewOrder } from "../../services/api_server"

import EmptyCart from "../cart/EmptyCart"
import Button from "../../ui/Button"
import { useNavigate } from "react-router-dom"

type OrderFormData = {
  customerName: string
  phone: string
  address: string
  priority: boolean
}

function CreateOrder() {
  const [withPriority, setWithPriority] = useState<boolean>(false)

  const username = useAppSelector((state) => state.user.fullName)
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<OrderFormData>()

  // const navigation = useNavigation()
  // const isSubmitting = navigation.state === "submitting"
  // const isSubmitting = false

  const dispatch = useAppDispatch()

  const cart: CartItemType[] = useAppSelector(getCart)
  const cartPrice: number = useAppSelector(getTotalCartPrice)
  const priorityPrice: number = withPriority
    ? Number((cartPrice * 0.2).toFixed(2))
    : 0

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: createNewOrder,
    onSuccess: (data) => {
      dispatch(clearCart())
      navigate(`/order/${data._id}`)
    },
  })

  if (cart.length === 0) {
    return <EmptyCart />
  }

  function onOrderSubmit(data: OrderFormData) {
    const correctCart: Order = {
      ...data,
      status: OrderStatus.Received,
      orderPrice: cartPrice,
      priorityPrice,
      cart,
    }
    mutate(correctCart)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

      <form onSubmit={handleSubmit(onOrderSubmit)}>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center ">
          <label id="customerName" className="sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            className="input grow"
            placeholder="John Doe"
            defaultValue={username}
            {...register("customerName", {
              required: "This field is required",
            })}
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label id="phoneNumber" className="sm:basis-40">
            Phone number
          </label>
          <input
            type="tel"
            className="input grow"
            placeholder="123-456-7890"
            {...register("phone")}
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label id="address" className="sm:basis-40">
            Address
          </label>
          <input
            type="text"
            placeholder="1234 st, OG"
            className="input grow"
            {...register("address", { required: "This field is required" })}
          />
        </div>

        <div className="mb-10 flex items-center gap-3">
          <input
            type="checkbox"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            id="priority"
            value={`${withPriority}`}
            {...register("priority", {
              onChange: (e) => setWithPriority(e.target.checked),
            })}
          />
          <label htmlFor="priority">Make this order priority</label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Place order for $${withPriority ? (cartPrice + priorityPrice).toFixed(2) : cartPrice.toFixed(2)}`}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder
