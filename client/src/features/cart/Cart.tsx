// import { useQuery } from "@tanstack/react-query"
import { useClearCart } from "../../services/cartHooks"
import Button from "../../ui/Button"
import LinkButton from "../../ui/LinkButton"
import { useAppSelector } from "../../utils/reduxHooks"
import CartItem from "./CartItem"
import EmptyCart from "./EmptyCart"
import { getCart } from "./cartSlice"

// productID is taken from the cake's _id
export type CartItemType = {
  productID: string
  productName: string
  unitPrice: number
  quantity: number
}

function Cart() {
  const cartItems = useAppSelector(getCart)

  const { clearCartItems, isClearing } = useClearCart()

  function onClearCart() {
    clearCartItems()
  }

  return (
    <div className="mx-6 my-4">
      {cartItems.length > 0 ? (
        <>
          <LinkButton to="/menu">&larr; Back to menu</LinkButton>
          <div className="my-6">
            <h2 className="font-bold uppercase text-stone-700">
              Cart summary:
            </h2>
            <ul className="divide-y divide-stone-300 border-b">
              {cartItems.map((item: CartItemType) => (
                <CartItem key={item.productID} {...item} />
              ))}
            </ul>
          </div>

          <div className="space-x-3">
            <Button type="primary" to="/order/new">
              Check out
            </Button>
            <Button
              disabled={isClearing}
              type="secondary"
              onClick={onClearCart}
            >
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  )
}

export default Cart
