import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UserState = {
  fullName: string
}

const initialState: UserState = {
  fullName: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload
    },
  },
})

export const { updateFullName } = userSlice.actions

export default userSlice.reducer
