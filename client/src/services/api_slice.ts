// ref: https://www.youtube.com/watch?v=R4AhvYORZRY&t=3623s - 2:20:00
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// process.env.PRODUCTION_API_URL
const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:5000" })

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Cart"],
  endpoints: () => ({}),
})
