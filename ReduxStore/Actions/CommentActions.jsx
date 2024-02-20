// dependencies
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comment/getComments",
  async ({ spaceId, postId, pageNum = 1, isRefreshed = false }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/posts/${spaceId}/posts/${postId}/comments?pageNum=${pageNum}&isRefreshed=${isRefreshed}`);
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      }
    }
  }
)

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/posts/${postId}/postcomment`, { comment: comment });
      return data;
    }
    catch (e) {
      if (e.response.data.error) {
        return rejectWithValue(e.response.data.error);
      }
    }
  }
)

