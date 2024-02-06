import type { CartItemType } from "../cart/Cart"

function OrderItem(item: CartItemType) {
  const { quantity, productName, unitPrice } = item
  const totalPrice = (unitPrice * quantity).toFixed(2)

  return (
    <li className="py-3">
      <div className="item-center flex justify-between">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {productName}
        </p>
        <p className="font-bold">${totalPrice}</p>
      </div>
    </li>
  )
}

export default OrderItem
