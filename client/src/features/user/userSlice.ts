import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UserState = {
  fullName: string
  authenticated: boolean
}

const initialState: UserState = {
  fullName: "",
  authenticated: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (
      state: UserState,
      action: PayloadAction<{ username: string; authenticated: boolean }>
    ) => {
      state.fullName = action.payload.username
      state.authenticated = action.payload.authenticated
    },
    clearUser: (state: UserState) => {
      state.fullName = ""
      state.authenticated = false
    },
  },
})

// action creators to be used by other components
export const { updateUser, clearUser } = userSlice.actions

export default userSlice.reducer
