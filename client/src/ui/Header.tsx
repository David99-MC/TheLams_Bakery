import { Link } from "react-router-dom"
import Username from "../features/user/Username"
import SearchOrder from "../features/order/SearchOrder"
import { useAppSelector } from "../utils/reduxHooks"
import LinkButton from "./LinkButton"

function Header() {
  const username = useAppSelector((state) => state.user.fullName)
  const authenticated = useAppSelector((state) => state.user.authenticated)
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-3 py-4">
      <Link className="font-semibold uppercase tracking-widest" to="/">
        The Lam's Bakery
      </Link>

      <SearchOrder />

      <div className="flex gap-3">
        {username ? <Username /> : <LinkButton to="/login">Login</LinkButton>}
        {username && authenticated ? (
          <LinkButton to="/home">Sign out</LinkButton>
        ) : (
          <LinkButton to="/login">Sign in</LinkButton>
        )}
      </div>
    </header>
  )
}

export default Header
