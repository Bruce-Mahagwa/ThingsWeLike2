// dependencies
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, getUserProfile, saveUserProfile, logoutUser } from "../Actions/UserActions"
// initial state
const initialState = {
  user: {},
  error: null,
  userProfile: {},
  status: "idle"
}
const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserLoginRegister(state) {
      state.error = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.userLoggedIn;
    }).addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.userCreated;
    }).addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
    }).addCase(logoutUser.fulfilled, (state) => {
      state.userProfile = {}
      state.user = {} 
    }).addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      state.status = "fulfilled"
    }).addCase(getUserProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed"
    }).addCase(getUserProfile.pending, (state, action) => {
      state.status = "loading";
    }).addCase(saveUserProfile.rejected, (state, action) => {
      state.error = action.payload;
    })
  }
})

export default UserSlice.reducer;
export const {clearUserLoginRegister } = UserSlice.actions;