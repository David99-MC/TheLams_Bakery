type item = {
  productName: string
  quantity: number
  totalPrice: number
}

function OrderItem(item: item) {
  const { quantity, productName, totalPrice } = item

  return (
    <li className="py-3">
      <div className="item-center flex justify-between">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {productName}
        </p>
        <p className="font-bold">${totalPrice}</p>
      </div>
    </li>
  )
}

export default OrderItem
