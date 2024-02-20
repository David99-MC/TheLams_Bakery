import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import Home from "./ui/Home"
import Menu from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import AppLayout from "./ui/AppLayout"
import Order from "./features/order/Order"
import ErrorNode from "./ui/ErrorNode"
import Login from "./features/user/Login"
import Register from "./features/user/Register"
import ProtectedRoutes from "./features/protectedRoutes/ProtectedRoutes"

const queryClient: QueryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/new" element={<CreateOrder />} />
            <Route path="/order/:orderId" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Reg ister />} />
            <Route
              path="/staff"
              element={
                <ProtectedRoutes>
                  {/* TODO: Staff layout */}
                  <div>staff routes</div>
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="login" />} />
              {/* /staff/{ComponentName} */}
            </Route>
            <Route
              path="*"
              element={
                <ErrorNode message="Can't find what you're looking for..." />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
