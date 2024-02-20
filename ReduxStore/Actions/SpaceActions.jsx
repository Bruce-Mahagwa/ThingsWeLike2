// dependencies
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// create space
export const createSpace = createAsyncThunk(
  "spaces/createSpace",
  async ({ spaceName, category, avatar, description, createdBy, userName,
    userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/spaces/user/createspace", { spaceName, category, avatar, description, createdBy, userName, userId });
      return data
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      }
    }
  }
)

export const editSpace = createAsyncThunk(
  "spaces/editSpace",
  async ({ spaceId, spaceName, category, avatar, description }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/spaces/user/editspace/${spaceId}`, { spaceName, category, avatar, description });
      return data
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error)
      }
    }
  }
)

export const joinSpace = createAsyncThunk(
  "spaces/joinSpace",
  async ({ spaceId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/spaces/user/${spaceId}/joinspace`, { spaceId });
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error)
      }
    }
  }
)

export const getSpaces = createAsyncThunk(
  "spaces/getSpaces",
  async ({ url, pageNum, searchQuery = "" }, { rejectWithValue }) => {
    try {
      if (searchQuery === "") {
        const { data } = await axios.get(`/spaces/${url}?pageNum=${pageNum}`);
        return data;
      }
      const { data } = await axios.get(`/spaces/${url}?pageNum=${pageNum}&searchQuery=${searchQuery}`)
      return data;
    }
    catch (e) {
      console.log(e)
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error)
      }
    }
  }
)

export const getSpace = createAsyncThunk(
  "spaces/getSpace",
  async ({ url, spaceId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/spaces/${url}/${spaceId}`);
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error)
      }
    }
  }
)

export const checkUserInSpace = createAsyncThunk(
  "spaces/checkUserInSpace",
  async ({ spaceId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/spaces/isInSpace/${spaceId}`);
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error)
      }
    }
  }
)
export const isSpaceCreator = createAsyncThunk(
  "spaces/isSpaceCreator",
  async ({ spaceId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/spaces/isCreatorofSpace/${spaceId}`);
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error)
      }
    }
  }
)
export const getUserSpaces = createAsyncThunk(
  "spaces/getUserSpaces",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/spaces/user");
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error)
      }
    }
  }
)

export const getUserSpace = createAsyncThunk(
  "spaces/getUserSpace",
  async ({ spaceId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/spaces/user/${spaceId}`)
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      }
    }
  }
)