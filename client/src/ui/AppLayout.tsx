import { Outlet } from "react-router-dom"
import CartOverview from "../features/cart/CartOverview"
import Header from "./Header"

function AppLayout() {
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
