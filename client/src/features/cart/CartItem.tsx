import { formatCurrency } from "../../utils/helper";

type CartItemProp = {
  productID: string;
  name: string;
  quantity: number;
  totalPrice: number;
};

function CartItem(item: CartItemProp) {
  const { productID, name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
