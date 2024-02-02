import type React from "react"
import { useState } from "react"

function SearchOrder() {
  const [searchQuery, setsearchQuery] = useState("")
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setsearchQuery("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order#"
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
        className="w-32 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500  sm:focus:w-72"
      />
    </form>
  )
}

export default SearchOrder
