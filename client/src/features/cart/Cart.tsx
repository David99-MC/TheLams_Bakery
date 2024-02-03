import Button from "../../ui/Button"
import LinkButton from "../../ui/LinkButton"

function Cart() {
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <div className="my-10">
        <h2>Your cart, %NAME HERE%</h2>
      </div>

      <div className="space-x-3">
        <Button type="primary" to="/order/new">
          Make an order
        </Button>
        <button className="bg-yellow-400 px-4 py-3">Clear cart</button>
      </div>
    </div>
  )
}

export default Cart
