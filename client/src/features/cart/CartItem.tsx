import Button from "../../ui/Button"
import { useAppDispatch } from "../../utils/reduxHooks"
import type { CartItemType } from "./Cart"
import { decItem, deleteItem, incItem } from "./cartSlice"

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
        <div className="flex items-center gap-1 md:gap-2">
          <Button onClick={() => dispatch(incItem(productID))} type="round">
            +
          </Button>
          <Button onClick={() => dispatch(decItem(productID))} type="round">
            &minus;
          </Button>
        </div>
        <Button type="small" onClick={() => dispatch(deleteItem(productID))}>
          Delete item
        </Button>
      </div>
    </li>
  )
}

export default CartItem
