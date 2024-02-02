import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import Home from "./ui/Home"
import Menu from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import AppLayout from "./ui/AppLayout"

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

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
            {/* <Route path="/order/:orderID" element={<CreateOrder />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
