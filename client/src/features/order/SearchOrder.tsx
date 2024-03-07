import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SearchOrder() {
  const [searchQuery, setsearchQuery] = useState("")
  const navigate = useNavigate()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate(`/order/${searchQuery}`)
    setsearchQuery("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
        className="me-3 w-32 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500  sm:focus:w-72"
        required
      />
    </form>
  )
}

export default SearchOrder
