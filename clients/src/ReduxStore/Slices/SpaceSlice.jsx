// dependencies
import { createSlice } from '@reduxjs/toolkit';
// files
import { getSpaces, getSpace, checkUserInSpace, createSpace, editSpace, getUserSpaces, isSpaceCreator, getUserSpace } from "../Actions/SpaceActions"
// variables 
const initialState = { 
  spaces: { data: [], total: 0, pageNum: 1, pageSize: 10 },
  space: { data: {}, isMember: null, topPosts: [] },
  userSpaces: { data: [], total: 0, pageNum: 1, pageSize: 10 },
  userSpace: { data: {}, isMember: true, userPosts: [], isCreator: null },
  error: null,
  status: "idle"
}

const SpaceSlice = createSlice({
  name: "spaces",
  initialState,
  reducers: {
    clearSpaces(state) {
      state.spaces.data = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSpaces.fulfilled, (state, action) => {
      state.spaces.data = action.payload.data
      state.spaces.total = action.payload.total
      state.spaces.pageNum = action.payload.pageNum
      state.spaces.pageSize = action.payload.pageSize
    }).addCase(getSpaces.rejected, (state, action) => {
      state.error = action.payload
    }).addCase(getSpace.fulfilled, (state, action) => {
      if (action.payload.message === "In Space") {
        state.userSpace.data = action.payload.data
      }
      else {
        state.space.data = action.payload.data
      }
    }).addCase(getSpace.rejected, (state, action) => {
      state.error = action.payload
    }).addCase(checkUserInSpace.fulfilled, (state, action) => {
      state.space.isMember = action.payload.data
    }).addCase(checkUserInSpace.rejected, (state, action) => {
      state.error = action.payload;
    }).addCase(createSpace.rejected, (state, action) => {
      state.error = action.payload
    }).addCase(editSpace.rejected, (state, action) => {
      state.error = action.payload
    }).addCase(getUserSpaces.fulfilled, (state, action) => {
      state.userSpaces.data = action.payload.data;
    }).addCase(getUserSpaces.rejected, (state, action) => {
      state.error = action.payload
    }).addCase(isSpaceCreator.fulfilled, (state, action) => {
      state.userSpace.isCreator = action.payload.data
    }).addCase(isSpaceCreator.rejected, (state, action) => {
      state.error = action.payload
    }).addCase(getUserSpace.fulfilled, (state, action) => {
      state.userSpace.data = action.payload.data
    }).addCase(getUserSpace.rejected, (state, action) => {
      state.error = action.payload
    })
  }
})
export default SpaceSlice.reducer
export const {clearSpaces} = SpaceSlice.actions;