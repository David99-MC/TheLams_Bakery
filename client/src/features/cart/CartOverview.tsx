import { Link } from "react-router-dom"
import { useAppSelector } from "../../utils/reduxHooks"
import { getTotalCartPrice, getTotalProducts } from "./cartSlice"
import { useGetCart } from "../../services/cartHooks"

function CartOverview() {
  const { isLoading } = useGetCart()

  const totalProducts: number = useAppSelector((state) =>
    getTotalProducts(state)
  )
  const totalCartPrice: number = useAppSelector((state) =>
    getTotalCartPrice(state)
  )

  if (totalProducts === 0) return null

  return (
    <div className="flex justify-between bg-stone-800 p-4 align-middle text-stone-200">
      {isLoading ? (
        <p>Loading cart...</p>
      ) : (
        <>
          <p className=" space-x-3 font-semibold text-stone-300">
            <span>{totalProducts} items</span>
            <span>${totalCartPrice.toFixed(2)}</span>
          </p>
          <Link to="/cart">Open cart &rarr;</Link>
        </>
      )}
    </div>
  )
}

export default CartOverview
