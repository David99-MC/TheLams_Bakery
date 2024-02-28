import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../utils/store"

export type userError = {
  status: number
  data: {
    message: string
    stack: string
  }
}

export type UserState = {
  fullName: string | null
  isAdmin: boolean
  accessToken: string | null
}

const initialState: UserState = {
  fullName: "",
  isAdmin: false,
  accessToken: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state: UserState, action: PayloadAction<UserState>) => {
      state.fullName = action.payload.fullName
      state.isAdmin = action.payload.isAdmin
      state.accessToken = action.payload.accessToken
    },
    clearCredentials: (state: UserState) => {
      state.fullName = null
      state.isAdmin = false
      state.accessToken = null
    },
  },
})

// action creators to be used by other components
export const { setCredentials, clearCredentials } = userSlice.actions

export default userSlice.reducer

export const getCurrentAccessToken = (state: RootState) =>
  state.user.accessToken
