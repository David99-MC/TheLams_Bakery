import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type userError = {
  status: number
  data: {
    message: string
    stack: string
  }
}

export type UserState = {
  user: { fullName: string; signedIn: boolean; isAdmin: boolean } | null
  token: string | null
}

const initialState: UserState = {
  user: null,
  token: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state: UserState, action: PayloadAction<UserState>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    clearCredentials: (state: UserState) => {
      state.user = null
      state.token = null
    },
  },
})

// action creators to be used by other components
export const { setCredentials, clearCredentials } = userSlice.actions

export default userSlice.reducer

export const selectCurrentUser = (state: { user: UserState }) => state.user.user
export const selectToken = (state: { user: UserState }) => state.user.token
