type item = {
  name: string
  quantity: number
  totalPrice: number
}

function OrderItem(item: item) {
  const { quantity, name, totalPrice } = item

  return (
    <li className="py-3">
      <div className="item-center flex justify-between">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">${totalPrice}</p>
      </div>
    </li>
  )
}

export default OrderItem
