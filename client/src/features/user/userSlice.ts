import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit"
import { authService, type userInfo } from "../../services/api_server"

type UserState = {
  username: string
  signedIn: boolean
  isAdmin?: boolean
  isFetching?: boolean
  errorMessage?: string
}

// get user info from local storage
const user = JSON.parse(localStorage.getItem("user") || "{}")

// Register functionality
export const register = createAsyncThunk(
  "user/register",
  async (user: userInfo, thunkAPI) => {
    try {
      return await authService.registerUser(user)
    } catch (error) {
      // Return the error message as action.payload in extra reducers
      return thunkAPI.rejectWithValue((error as Error).message)
    }
  }
)

// Login functionality
// export const login = createAsyncThunk(
//   "user/login",
//   async (user: userInfo, thunkAPI) => {
//     try {
//       // TODO: retrieve user info from server and store it in local storage,
//       // including Cart state
//       return await authService.login(user)
//     } catch (error) {
//       return thunkAPI.rejectWithValue((error as Error).message)
//     }
//   }
// )

const initialState: UserState = {
  username: user ? user.username : "",
  signedIn: false,
  isAdmin: false,
  isFetching: false,
  errorMessage: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // used for guest checkout
    updateUser: (state: UserState, action: PayloadAction<UserState>) => {
      state.username = action.payload.username
      state.signedIn = action.payload.signedIn
      state.isAdmin = action.payload.isAdmin
    },
    clearUser: (state: UserState) => {
      state.username = ""
      state.signedIn = false
      state.isAdmin = false
      state.isFetching = false
      state.errorMessage = ""
    },
    reset: (state: UserState) => {
      state.isFetching = false
      state.errorMessage = ""
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log("action.payload", action.payload)
        state.isFetching = false
        state.username = action.payload.username
        state.signedIn = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isFetching = false
        state.errorMessage = action.payload as string
      })
      .addCase(register.pending, (state) => {
        state.isFetching = true
      })
  },
})

// action creators to be used by other components
export const { updateUser, clearUser, reset } = userSlice.actions

export default userSlice.reducer
