import { clearCart, setCart } from "../features/cart/cartSlice"
import { clearCredentials, setCredentials } from "../features/user/userSlice"
import { useAppDispatch } from "../utils/reduxHooks"

const API_URL = "https://thelamsbakery-api.onrender.com" // "http://localhost:5000/"

export const useRefreshToken = () => {
  const dispatch = useAppDispatch()
  async function refresh() {
    const res = await fetch(API_URL + "api/refreshToken", {
      credentials: "include",
      headers: {
        "cache-control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
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
    const res = await fetch(API_URL + "api/logout", {
      credentials: "include",
      headers: {
        "cache-control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    })
    const msg = await res.json()
    dispatch(clearCredentials())
    dispatch(clearCart())
    return msg
  }
  return logout
}
