import { useEffect } from "react"
import { useRefreshToken } from "../../services/customHooks"
import { useAppSelector } from "../../utils/reduxHooks"
import { getCurrentAccessToken } from "../user/userSlice"
import { Outlet } from "react-router-dom"

function PersistLogin() {
  const refresh = useRefreshToken()
  const accessToken = useAppSelector(getCurrentAccessToken)

  useEffect(() => {
    async function verifyRefreshToken() {
      console.log("Regenerating access token...")
      try {
        await refresh()
      } catch (error) {
        console.log(error)
      }
    }
    !accessToken && verifyRefreshToken()
  }, [refresh, accessToken])

  return <Outlet />
}

export default PersistLogin
