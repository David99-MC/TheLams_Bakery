import { Link } from "react-router-dom";

function Cart() {
  return (
    <div>
      <Link to="/menu">&larr; Back to menu</Link>

      <h2>Your cart, %NAME HERE%</h2>

      <div>
        <Link to="/order/new">Make an order</Link>
        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
