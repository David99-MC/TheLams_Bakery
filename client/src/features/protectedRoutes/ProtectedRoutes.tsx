import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../utils/reduxHooks"
import { useEffect } from "react"

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const authenticated = useAppSelector((state) => state.user.authenticated)

  useEffect(() => {
    if (!authenticated) {
      navigate("/login")
    }
  }, [authenticated, navigate])

  return children
}

export default ProtectedRoutes
