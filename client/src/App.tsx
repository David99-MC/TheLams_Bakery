import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

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
import UpdateMenu from "./features/admin/UpdateMenu"
import PersistLogin from "./features/protectedRoutes/PersistLogin"

const queryClient: QueryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Public Routes */}
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/order/:orderId" element={<Order />} />

            {/* Protected Routes */}
            <Route element={<PersistLogin />}>
              <Route element={<ProtectedRoutes />}>
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order/new" element={<CreateOrder />} />
                {/* TODO: Admin Routes */}
                <Route path="/updateMenu" element={<UpdateMenu />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={
                <ErrorNode message="Can't find what you're looking for..." />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
      />
    </QueryClientProvider>
  )
}

export default App
