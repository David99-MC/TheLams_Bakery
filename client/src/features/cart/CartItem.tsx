import Button from "../../ui/Button"
import type { CartItemType } from "./Cart"

function CartItem(item: CartItemType) {
  const { productName, unitPrice, quantity } = item
  const totalPrice = (unitPrice * quantity).toFixed(2)

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="font-medium">
        {quantity}&times; {productName}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-bold">${totalPrice}</p>
        <Button type="small">Delete item</Button>
      </div>
    </li>
  )
}

export default CartItem
