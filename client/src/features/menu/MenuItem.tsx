import type { Cake } from "../../../../server/src/models/cake"
import Button from "../../ui/Button"

function MenuItem(item: Cake) {
  const { vietnameseName, unitPrice, ingredients, soldOut, imgUrl } = item

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
          {!soldOut && <Button type="small">Add to cart</Button>}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
