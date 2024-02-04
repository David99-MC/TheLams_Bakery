import Button from "../../ui/Button"
import LinkButton from "../../ui/LinkButton"
import CartItem from "./CartItem"

// type CartItemProp = {
//   productID: string
//   name: string
//   quantity: number
//   totalPrice: number
// }

const fakeCartItems = [
  {
    productID: "1",
    name: "Banh Chung",
    quantity: 2,
    totalPrice: 12.99,
  },
  {
    productID: "2",
    name: "Banh Deo",
    quantity: 3,
    totalPrice: 15.99,
  },
  {
    productID: "3",
    name: "Banh Dau Xanh",
    quantity: 1,
    totalPrice: 10.99,
  },
  {
    productID: "4",
    name: "Banh Chuoi",
    quantity: 4,
    totalPrice: 17.99,
  },
]

function Cart() {
  return (
    <div className="mx-6 my-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <div className="my-6">
        <h2 className="font-bold uppercase text-stone-700">
          Your cart, %NAME HERE%
        </h2>
        <ul className="divide-y divide-stone-300 border-b">
          {fakeCartItems.map((item) => (
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
