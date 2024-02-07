import { Link, useNavigate } from "react-router-dom"
import Username from "../features/user/Username"
import SearchOrder from "../features/order/SearchOrder"
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks"
import Button from "./Button"
import { clearUser } from "../features/user/userSlice"

function Header() {
  const username = useAppSelector((state) => state.user.fullName)
  const authenticated = useAppSelector((state) => state.user.authenticated)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  function handleSignOut() {
    dispatch(clearUser())
    navigate("/home")
  }
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-3 py-4">
      <Link className="font-semibold uppercase tracking-widest" to="/">
        The Lam's Bakery
      </Link>

      <SearchOrder />

      <div className="flex items-center gap-3">
        {username && <Username />}
        {username && authenticated ? (
          <Button onClick={handleSignOut} type="small">
            Sign out
          </Button>
        ) : (
          <Button type="small" to="/login">
            Sign in
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
