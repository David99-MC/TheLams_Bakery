import Button from "../../ui/Button"
import { useAppDispatch } from "../../utils/reduxHooks"
import type { CartItemType } from "./Cart"
import { deleteItem } from "./cartSlice"

function CartItem(item: CartItemType) {
  const { productID, productName, unitPrice, quantity } = item
  const totalPrice = (unitPrice * quantity).toFixed(2)
  const dispatch = useAppDispatch()

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="font-medium">
        {quantity}&times; {productName}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-bold">${totalPrice}</p>
        <Button
          type="small"
          role="deleteItem"
          onDeleteItem={() => dispatch(deleteItem(productID))}
        >
          Delete item
        </Button>
      </div>
    </li>
  )
}

export default CartItem
