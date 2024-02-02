import { type Cake } from "../../../../server/src/models/cake"

function MenuItem(item: Cake) {
  const { id, vietnameseName, unitPrice, ingredients, soldOut, imgUrl } = item

  return (
    <li>
      <img src={imgUrl} alt={vietnameseName} />
      <div>
        <p>{vietnameseName}</p>
        <p>{ingredients}</p>
        <div>{!soldOut ? <p>{unitPrice}</p> : <p>Sold out</p>}</div>
      </div>
    </li>
  )
}

export default MenuItem
