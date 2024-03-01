import { useEffect } from "react"
import { useRefreshToken } from "../../services/userHooks"
import { useAppSelector } from "../../utils/reduxHooks"
import { getCurrentAccessToken } from "../user/userSlice"
import { Outlet } from "react-router-dom"

function PersistLogin() {
  const refresh = useRefreshToken()
  const { fullName } = useAppSelector((state) => state.user)
  const accessToken = useAppSelector(getCurrentAccessToken)

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      }
    }
    if (!accessToken && !fullName) {
      return
    } else if (!accessToken) {
      verifyRefreshToken()
    }
  }, [refresh, accessToken, fullName])

  return <Outlet />
}

export default PersistLogin
