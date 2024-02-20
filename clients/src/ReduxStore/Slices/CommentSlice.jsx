// files
import { getComments, createComment } from "../Actions/CommentActions";
// dependencies
import { createSlice } from "@reduxjs/toolkit"
// variables
const initialState = {
  comments: { data: [], total: 1, pageNum: 1, pageSize: 1 },
  error: null,
  status: "idle"
}

const CommentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments(state) {
      state.comments.data = []
    },
    getCommentsFromSocketIo(state, item) {
      state.comments.data = [item.payload, ...state.comments.data]
      console.log(state.comments.data, "commments")
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments.data = [...state.comments.data, ...action.payload.data];
      state.comments.total = action.payload.total;
      state.comments.pageNum = action.payload.pageNum;
      state.comments.pageSize = action.payload.pageSize;
    }).addCase(getComments.rejected, (state, action) => {
      state.error = action.payload;
    }).addCase(createComment.rejected, (state, action) => {
      state.error = action.payload;
    })
  }
})

export default CommentsSlice.reducer
export const { clearComments, getCommentsFromSocketIo } = CommentsSlice.actions