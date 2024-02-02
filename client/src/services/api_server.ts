const BASE_URL = "http://localhost:5000/"

export async function getMenu() {
  const res = await fetch(BASE_URL + "menu")
  //the caller will catch this error
  if (!res.ok) throw new Error("Failed to fetch the menu")
  const data = await res.json()
  return data
}
