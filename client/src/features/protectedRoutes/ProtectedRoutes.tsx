import { Outlet, useLocation, Navigate } from "react-router-dom"
import { useAppSelector } from "../../utils/reduxHooks"
import { getCurrentAccessToken } from "../user/userSlice"

function ProtectedRoutes() {
  const token = useAppSelector(getCurrentAccessToken)
  const location = useLocation()

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectedRoutes
