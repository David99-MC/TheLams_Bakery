import { clearCart, setCart } from "../features/cart/cartSlice"
import { clearCredentials, setCredentials } from "../features/user/userSlice"
import { useAppDispatch } from "../utils/reduxHooks"

export const useRefreshToken = () => {
  const dispatch = useAppDispatch()
  async function refresh() {
    const res = await fetch("http://localhost:5000/api/refreshToken", {
      credentials: "include",
    })
    const data = await res.json()
    const { user, accessToken, cart } = data
    dispatch(
      setCredentials({
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        accessToken,
      })
    )
    dispatch(setCart(cart))
  }
  return refresh
}

export const useLogout = () => {
  const dispatch = useAppDispatch()
  async function logout() {
    const res = await fetch("http://localhost:5000/api/logout", {
      credentials: "include",
    })
    const msg = await res.json()
    dispatch(clearCredentials())
    dispatch(clearCart())
    return msg
  }
  return logout
}
