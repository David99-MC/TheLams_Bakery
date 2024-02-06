import LinkButton from "../../ui/LinkButton"

function EmptyCart() {
  return (
    <div className="mt-10">
      <div className="mb-10 bg-stone-300 p-4 font-semibold">
        Your cart is empty. Start adding some product 🍞
      </div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
    </div>
  )
}

export default EmptyCart
