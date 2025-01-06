// files
import { createSlice } from '@reduxjs/toolkit';
import { getPosts, getPost, createPost } from "../Actions/PostActions";

// variables
const initialState = {
  posts: { data: [], total: 0, pageNum: 1, pageSize: 5 },
  post: { data: {} },
  spaceName: "",
  error: null,
  status: "idle"
}

const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts(state) {
      // empties the posts data array
      state.posts.data = [];
    },
    getPostsFromSocketIo(state, post) {
      state.posts.data = [post.payload, ...state.posts.data];      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {      
      if (action.payload.prefix === "posts") {
        state.posts.data = action.payload.data_copy.data
      }
      else {
        state.posts.data = [...state.posts.data, ...action.payload.data_copy.data];
      }
      state.posts.total = action.payload.data_copy.total;
      state.posts.pageNum = action.payload.data_copy.pageNum;
      state.posts.pageSize = action.payload.data_copy.pageSize;
      state.spaceName = action.payload.data_copy.spaceName;
    }).addCase(getPosts.rejected, (state, action) => {
      state.error = action.payload;
    }).addCase(createPost.rejected, (state, action) => {
      state.error = action.payload;
    }).addCase(getPost.fulfilled, (state, action) => {
      state.post.data = action.payload.data
    }).addCase(getPost.rejected, (state, action) => {
      state.error = action.payload;
    })
  }
})

export default PostSlice.reducer;
export const { clearPosts, getPostsFromSocketIo } = PostSlice.actions; 