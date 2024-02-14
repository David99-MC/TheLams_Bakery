import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UserState = {
  username: string
  signedIn: boolean
  isAdmin?: boolean
}

const initialState: UserState = {
  username: "",
  signedIn: false,
  isAdmin: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state: UserState, action: PayloadAction<UserState>) => {
      state.username = action.payload.username
      state.signedIn = action.payload.signedIn
      state.isAdmin = action.payload.isAdmin
    },
    clearUser: (state: UserState) => {
      state.username = ""
      state.signedIn = false
      state.isAdmin = false
    },
  },
})

// action creators to be used by other components
export const { updateUser, clearUser } = userSlice.actions

export default userSlice.reducer
