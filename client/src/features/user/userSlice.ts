import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type UserState = {
  fullName: string
}

const initialState: UserState = {
  fullName: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload
    },
  },
})

// action creators to be used by other components
export const { updateFullName } = userSlice.actions

export default userSlice.reducer
