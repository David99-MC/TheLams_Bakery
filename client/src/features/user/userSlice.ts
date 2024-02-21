import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { apiSlice } from "../../services/api_slice"

export type authData = { username: string; password: string }
export type userError = {
  status: number
  data: {
    message: string
    stack: string
  }
}

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
    logout: builder.mutation({
      query: () => ({
        url: "/api/logout",
        method: "GET",
      }),
    }),
  }),
})

type UserState = {
  fullName: string
  signedIn: boolean
  isAdmin: boolean
}

// get user info from local storage
const userInfo: UserState = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") || "{}")
  : null

const initialState: UserState = {
  fullName: userInfo ? userInfo.fullName : "",
  signedIn: userInfo ? userInfo.signedIn : false,
  isAdmin: userInfo ? userInfo.isAdmin : false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // used for guest checkout
    setCredentials: (state: UserState, action: PayloadAction<UserState>) => {
      state.fullName = action.payload.fullName
      state.signedIn = action.payload.signedIn
      state.isAdmin = action.payload.isAdmin || false
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
    },
    clearCredentials: (state: UserState) => {
      state.fullName = ""
      state.signedIn = false
      state.isAdmin = false
      localStorage.removeItem("userInfo")
    },
  },
})

// action creators to be used by other components
export const { setCredentials, clearCredentials } = userSlice.actions

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApiSlice

export default userSlice.reducer
