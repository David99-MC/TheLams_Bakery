import Button from "../../ui/Button"

type CartItemProp = {
  productID: string
  name: string
  quantity: number
  totalPrice: number
}

function CartItem(item: CartItemProp) {
  const { name, quantity, totalPrice } = item

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="font-medium">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-bold">${totalPrice}</p>
        <Button type="small">Delete item</Button>
      </div>
    </li>
  )
}

export default CartItem
