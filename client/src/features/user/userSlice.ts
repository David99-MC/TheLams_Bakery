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
      state,
      action: PayloadAction<{ username: string; authenticated: boolean }>
    ) => {
      state.fullName = action.payload.username
      state.authenticated = action.payload.authenticated
    },
    clearUser: (state) => {
      state.fullName = ""
      state.authenticated = false
    },
  },
})

// action creators to be used by other components
export const { updateUser } = userSlice.actions

export default userSlice.reducer
