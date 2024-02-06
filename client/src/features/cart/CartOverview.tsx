import { Link } from "react-router-dom"
import { useAppSelector } from "../../utils/reduxHooks"
import type { CartItemType } from "./Cart"

function CartOverview() {
  const cart: CartItemType[] = useAppSelector((state) => state.cart.cartItems)
  const totalPrice = cart.reduce(
    (acc, cur) => (acc += cur.unitPrice * cur.quantity),
    0
  )
  const totalProducts = cart.length

  return (
    <div className="flex justify-between bg-stone-800 p-4 align-middle text-stone-200">
      <p className=" space-x-3 font-semibold text-stone-300">
        <span>{totalProducts} items</span>
        <span>${totalPrice.toFixed(2)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
