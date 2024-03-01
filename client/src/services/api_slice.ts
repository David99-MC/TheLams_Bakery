// BOILERPLATE CODE: This file is a part of the boilerplate code that is used to create a Redux API slice.
// REF: https://www.youtube.com/watch?v=-JJFQ9bkUbo&list=PL-LVlW4YsxCawPbcjYVI-oSHfprc2O1Cb&index=12&t=70s ~ 6:00
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react"
import { setCredentials, clearCredentials } from "../features/user/userSlice"
import type { RootState } from "../utils/store"

// TODO: change this to the actual server URL
const API_URL = "https://thelamsbakery-api.onrender.com" // "http://localhost:5000"

// Set up the base http query with the access token in the header
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.accessToken
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`)
      // headers.set("cache-control", "no-cache")
      // headers.set("X-Content-Type-Options", "nosniff")
    }
    return headers
  },
})

// Handle 403 errors (expired access token) by requesting a new access token,
// using the user's refresh token in db,
// then retry the original request with the new access
const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error?.status === 403) {
    console.log("sending refresh token...")
    const refreshResult = await baseQuery(
      "/api/refreshToken",
      api,
      extraOptions
    )
    if (refreshResult?.data) {
      console.log("refresh token success")
      // store the new token in the redux store (memory only)
      const { fullName, isAdmin } = (api.getState() as RootState).user
      // refreshResult.data === new access token from the server
      api.dispatch(
        setCredentials({
          fullName,
          isAdmin,
          accessToken: refreshResult.data as string,
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
