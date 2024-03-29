import { useAddCartItem } from "../../services/cartHooks"
import Button from "../../ui/Button"
import type { CartItemType } from "../cart/Cart"
import type { Cake } from "./MenuTypes"

function MenuItem(item: Cake) {
  const { _id, vietnameseName, unitPrice, ingredients, soldOut, imgUrl } = item
  const cartItem: CartItemType = {
    productID: _id || "",
    productName: vietnameseName,
    quantity: 1,
    unitPrice,
  }
  const { addCartItem, isAdding } = useAddCartItem()
  function onAddToCart() {
    addCartItem({ item: cartItem, action: "add" })
  }

  return (
    <li className={`flex gap-4 py-2 ${soldOut ? "opacity-70 grayscale" : ""}`}>
      <img src={imgUrl} alt={vietnameseName} className="h-24" />
      <div className="flex grow flex-col">
        <p className="font-medium">{vietnameseName}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">${unitPrice}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <Button
            disabled={soldOut || isAdding}
            onClick={onAddToCart}
            type="small"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </li>
  )
}

export default MenuItem
