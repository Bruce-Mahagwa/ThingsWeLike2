// dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("users/loginUser", async ({ email, password, doNotLogOut }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/users/login", { "email": email, "password": password, "doNotLogOut": doNotLogOut });
    if (data.userLoggedIn.doNotLogOut) {
      localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn))
    }
    else {
      sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn))
    }
    return data;
  }
  catch (e) {
    if (e.response.data.error) {
      return rejectWithValue(e.response.data.error);
    }
  }
})

export const registerUser = createAsyncThunk("users/registerUser", async ({ userName, email, password }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/users/register", {
      "userName": userName, "email": email, "password": password
    })
    sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated))
    if (data.success === "Congratulations!! You have been registered") {
      window.location.href = "/home";
    }
    return data;
  }
  catch (e) {
    if (e.reponse.data.error) {
      return rejectWithValue(e.response.data.error);
    }
  }
})

export const logoutUser = createAsyncThunk("users/logoutUser", async (_, { rejectWithValue }) => {
  try {
    document.location.href = "/";
    await axios.get("/users/user/logout")
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("userProfile");
  }
  catch (e) {
    if (e.response.data.error) {
      console.log(e)
      return rejectWithValue(e.response.data.error)
    }
  }
})

export const getUserProfile = createAsyncThunk("users/getUserProfile", async (_, { rejectWithValue, getState }) => {
  try {
    const { user } = getState().users;
    const { data } = await axios.get(`/users/user/${user._id}`)
    sessionStorage.setItem("userProfile", JSON.stringify(data))
    return data.user;
  }
  catch (e) {
    if (e.response.data.error) {
      return rejectWithValue(e.response.data.error);
    }
  }
})
export const saveUserProfile = createAsyncThunk(
  "users/saveUserProfile",
  async ({ firstName, lastName, avatar, description }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/users/user", { firstName, lastName, avatar, description })
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      }
    }
  }
)
