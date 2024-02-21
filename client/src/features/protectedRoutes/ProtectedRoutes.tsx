import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../utils/reduxHooks"
import ErrorNode from "../../ui/ErrorNode"

function ProtectedRoutes() {
  const { signedIn, isAdmin } = useAppSelector((state) => state.user)

  const authorized = signedIn && isAdmin

  return authorized ? (
    <Outlet />
  ) : (
    <ErrorNode message="You are not authorized to access this page" />
  )
}

export default ProtectedRoutes
