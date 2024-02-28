import { apiSlice } from "../../services/api_slice"

export type authData = { username: string; password: string }

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: authData) => ({
        url: "/api/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: authData) => ({
        url: "/api/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = userApiSlice
