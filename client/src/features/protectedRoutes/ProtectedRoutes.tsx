import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../utils/reduxHooks"
import { useEffect } from "react"

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const signedIn = useAppSelector((state) => state.user.signedIn)
  const isAdmin = useAppSelector((state) => state.user.isAdmin)

  const authenticated = signedIn && isAdmin

  useEffect(() => {
    if (!authenticated) {
      navigate("/login")
    }
  }, [authenticated, navigate])

  return children
}

export default ProtectedRoutes
