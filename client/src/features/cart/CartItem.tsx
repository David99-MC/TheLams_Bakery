import { useUpdateCartItem } from "../../services/cartHooks"
import Button from "../../ui/Button"
import type { CartItemType } from "./Cart"

function CartItem(item: CartItemType) {
  const { productName, unitPrice, quantity } = item

  const totalPrice = (unitPrice * quantity).toFixed(2)

  const { updateCartItem, isUpdating } = useUpdateCartItem()

  function onIncItem() {
    updateCartItem({ item, action: "add" })
  }

  function onDecItem() {
    updateCartItem({ item, action: "remove" })
  }

  function onDeleteItem() {
    updateCartItem({ item, action: "delete" })
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="font-medium">
        {quantity}&times; {productName}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-bold">${totalPrice}</p>
        <div className="flex items-center gap-1 md:gap-2">
          <Button disabled={isUpdating} onClick={onIncItem} type="round">
            +
          </Button>
          <Button disabled={isUpdating} onClick={onDecItem} type="round">
            &minus;
          </Button>
        </div>
        <Button disabled={isUpdating} type="small" onClick={onDeleteItem}>
          Delete item
        </Button>
      </div>
    </li>
  )
}

export default CartItem
