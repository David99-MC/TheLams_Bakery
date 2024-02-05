import { Link } from "react-router-dom"
import Username from "../features/user/Username"
import SearchOrder from "../features/order/SearchOrder"

function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-3 py-4">
      <Link className="font-semibold uppercase tracking-widest" to="/">
        The Lam's Bakery
      </Link>

      <SearchOrder />

      <Username />
    </header>
  )
}

export default Header
