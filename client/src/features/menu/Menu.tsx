import { useQuery } from "@tanstack/react-query"
import { getMenu } from "../../services/api_server"

function Menu() {
  const {
    isLoading,
    data: menuItems,
    error,
  } = useQuery({ queryKey: ["menu"], queryFn: getMenu })

  console.log(menuItems)

  if (isLoading) return <div>Loading...</div>

  return <h1>Menu</h1>
}

export default Menu
