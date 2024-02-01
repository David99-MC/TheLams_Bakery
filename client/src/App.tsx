import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/new" element={<CreateOrder />} />
        {/* <Route path="/order/:orderID" element={<CreateOrder />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
