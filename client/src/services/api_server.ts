const BASE_URL = "http://localhost:5000/"

export async function getMenu() {
  const res = await fetch(BASE_URL + "menu")
  //the caller will catch this error
  if (!res.ok) throw new Error("Failed to fetch the menu")
  const data = await res.json()
  return data
}

export async function getOrderById(id: string) {
  console.log("hello from server api:", BASE_URL + `order/${id}`)
  const res = await fetch(BASE_URL + `order/${id}`)
  if (!res.ok) throw new Error("Can't find that order")
  const data = await res.json()
  return data
}
