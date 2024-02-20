// dependencies
import axios from "axios"  
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async ({ prefix, spaceId, pageNum = 1, isRefreshed = false }, { rejectWithValue }) => {
    try {
      // we do not need to have logged in here. we'll display only the latest 10 posts.
      let data_copy;
      if (prefix === "posts") {
        const { data } = await axios.get(`/posts/${spaceId}/posts`);
        data_copy = data;
      }
      else if (prefix === "spaces") {
        // we need to be loginned here
        const { data } = await axios.get(`/spaces/user/${spaceId}/posts?pageNum=${pageNum}&isRefreshed=${isRefreshed}`);
        data_copy = data;
      }
      return { data_copy, prefix }
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      }
    }
  }
)


export const getPost = createAsyncThunk(
  "post/getPost",
  async ({ spaceId, postId, prefix }, { rejectWithValue }) => {
    try {
      if (prefix = "posts") {
        const { data } = await axios.get(`/posts/${spaceId}/posts/${postId}`);
        return data;
      }
      else if (prefix = "spaces") {
        const { data } = await axios.get(`/spaces/user/${spaceId}/posts/${postId}`)
        return data;
      }
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      }
    }
  }
)

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ spaceId, description }, { rejectWithValue }) => {
    try { 
      const { data } = await axios.post(`/posts/${spaceId}/createpost`, description);
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      }
    }
  }
)

