import { Link } from "react-router-dom"

function CartOverview() {
  return (
    <div className="flex justify-between bg-stone-800 p-4 align-middle text-stone-200">
      <p className=" space-x-3 font-semibold text-stone-300">
        <span>23 breads</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
