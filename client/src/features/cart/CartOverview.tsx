import { Link } from "react-router-dom"
import { useAppSelector } from "../../utils/reduxHooks"
import { getTotalCartPrice, getTotalProducts } from "./cartSlice"

function CartOverview() {
  const totalProducts: number = useAppSelector(getTotalProducts)
  const totalCartPrice: number = useAppSelector(getTotalCartPrice)
  if (totalProducts === 0) return null

  return (
    <div className="flex justify-between bg-stone-800 p-4 align-middle text-stone-200">
      <p className=" space-x-3 font-semibold text-stone-300">
        <span>{totalProducts} items</span>
        <span>${totalCartPrice.toFixed(2)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
