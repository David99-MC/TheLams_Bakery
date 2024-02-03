import { useQuery } from "@tanstack/react-query"
import { getMenu } from "../../services/api_server"
import MenuItem from "./MenuItem"
import type { Cake } from "../../../../server/src/models/cake"
import Loader from "../../ui/Loader"

function Menu() {
  const { isLoading, data: menuItems } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenu,
  })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="divide-y divide-stone-200">
          {menuItems.map((item: Cake) => (
            <MenuItem key={item._id} {...item} />
          ))}
        </ul>
      )}
    </>
  )
}

export default Menu
