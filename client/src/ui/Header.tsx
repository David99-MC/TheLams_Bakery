import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../utils/reduxHooks"
import Username from "../features/user/Username"
import SearchOrder from "../features/order/SearchOrder"
import Button from "./Button"
import toast from "react-hot-toast"
import { useLogout } from "../services/userHooks"

function Header() {
  const { fullName } = useAppSelector((state) => state.user) ?? {}

  const navigate = useNavigate()
  const logout = useLogout()

  async function handleSignOut() {
    const { message } = await logout()
    navigate("/home")
    toast.success(message)
  }
  return (
    <header className="flex items-center justify-between bg-yellow-500 px-3 py-4">
      <Link className="font-semibold uppercase tracking-widest" to="/">
        The Lam's Bakery
      </Link>

      <SearchOrder />

      <div className="flex items-center gap-3">
        {fullName ? (
          <>
            <Username />
            <Button onClick={handleSignOut} type="small">
              <span className="text-nowrap">Sign out</span>
            </Button>
          </>
        ) : (
          <Button type="small" to="/login">
            <span className="text-nowrap">Sign in</span>
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
