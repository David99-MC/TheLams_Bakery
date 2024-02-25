import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks"
import { clearCredentials } from "../features/user/userSlice"
import Username from "../features/user/Username"
import SearchOrder from "../features/order/SearchOrder"
import Button from "./Button"
import toast from "react-hot-toast"
import { useLogoutMutation } from "../features/user/userApiSlice"

function Header() {
  const { fullName } = useAppSelector((state) => state.user) ?? {}
  console.log("fullName:", fullName)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  async function handleSignOut() {
    const signOutMessage = await logout({}).unwrap()
    dispatch(clearCredentials())
    navigate("/home")
    toast.success(signOutMessage.message)
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
              Sign out
            </Button>
          </>
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
