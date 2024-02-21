// BOILERPLATE CODE: This file is a part of the boilerplate code that is used to create a Redux API slice.
// REF: https://www.youtube.com/watch?v=-JJFQ9bkUbo&list=PL-LVlW4YsxCawPbcjYVI-oSHfprc2O1Cb&index=12&t=70s ~ 6:00
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react"
import {
  setCredentials,
  clearCredentials,
  type UserState,
} from "../features/user/userSlice"

const API_URL = process.env.PRODUCTION_API_URL || "http://localhost:5000"

// Set up the base http query
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { user: UserState }).user.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

// Handle 401 errors by sending a refresh the token
const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error?.status === 401) {
    console.log("sending refresh token...")
    const refreshResult = await baseQuery("/api/refresh", api, extraOptions)
    if (refreshResult?.data) {
      // IMPORTANT: Double check this with the backend
      console.log("refresh token success")
      // store the new token in the redux store
      const { user, token } = (api.getState() as { user: UserState }).user
      api.dispatch(
        setCredentials({
          ...refreshResult.data,
          user,
          token,
        })
      )
      // Try the original request again with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      console.log("refresh token failed")
      api.dispatch(clearCredentials())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
