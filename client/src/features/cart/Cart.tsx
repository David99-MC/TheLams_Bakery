import Button from "../../ui/Button"
import LinkButton from "../../ui/LinkButton"
import { useAppSelector } from "../../utils/reduxHooks"
import CartItem from "./CartItem"

export type CartItemType = {
  productID: string
  productName: string
  unitPrice: number
  quantity: number
}
// remove productID since mongo already gave an _id field
const fakeCartItems: CartItemType[] = [
  {
    productID: "1",
    productName: "Banh Chung",
    unitPrice: 12.99,
    quantity: 2,
  },
  {
    productID: "2",
    productName: "Banh Deo",
    unitPrice: 15.99,
    quantity: 3,
  },
  {
    productID: "3",
    productName: "Banh Dau Xanh",
    unitPrice: 10.99,
    quantity: 1,
  },
  {
    productID: "4",
    productName: "Banh Chuoi",
    unitPrice: 17.99,
    quantity: 4,
  },
]

function Cart() {
  const username = useAppSelector((state) => state.user.fullName)
  return (
    <div className="mx-6 my-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <div className="my-6">
        <h2 className="font-bold uppercase text-stone-700">
          Please review your cart, {username}
        </h2>
        <ul className="divide-y divide-stone-300 border-b">
          {fakeCartItems.map((item: CartItemType) => (
            <CartItem key={item.productID} {...item} />
          ))}
        </ul>
      </div>

      <div className="space-x-3">
        <Button type="primary" to="/order/new">
          Check out
        </Button>
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  )
}

export default Cart
