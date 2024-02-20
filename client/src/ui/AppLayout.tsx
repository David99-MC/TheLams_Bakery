import { Outlet } from "react-router-dom"
import CartOverview from "../features/cart/CartOverview"
import Header from "./Header"
import { useAppSelector } from "../utils/reduxHooks"

function AppLayout() {
  const signedIn = useAppSelector((state) => state.user.signedIn)
  // Check for jwt token, send a request to server to verify the token?

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  )
}

export default AppLayout
