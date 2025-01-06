// dependencies
import { configureStore } from "@reduxjs/toolkit"
// files      
import UserReducer from "./Slices/UserSlice";
import SpaceReducer from "./Slices/SpaceSlice";
import PostReducer from "./Slices/PostSlice";
import CommentReducer from "./Slices/CommentSlice";
// userInfo and profile
const userInfoInLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
const userProfileInLocalStorage = sessionStorage.getItem("userProfile") ? JSON.parse(sessionStorage.getItem("userProfile")) : {}

// initialState
const INITIAL_STATE = {
  users: {
    user: userInfoInLocalStorage,
    error: null,
    userProfile: userProfileInLocalStorage,
    status: "idle"
  },
  spaces: {
    spaces: { data: [], total: 1, pageNum: 1, pageSize: 10 },
    space: { data: {}, isMember: null, topPosts: [] },
    userSpaces: { data: [], total: 1, pageNum: 1, pageSize: 10 },
    userSpace: { data: {}, isMember: true, userPosts: [], isCreator: null },
    error: null,
    status: "idle"
  },
  posts: {
    posts: { data: [], total: 1, pageNum: 1, pageSize: 5 },
    post: { data: {} },
    spaceName: "",
    error: null,
    status: "idle"
  },
  comments: {
    comments: { data: [], total: 1, pageNum: 1, pageSize: 1 },
    error: null,
    status: "idle"
  }
}

export default configureStore({
  reducer: {
    users: UserReducer,
    spaces: SpaceReducer,
    posts: PostReducer,
    comments: CommentReducer,
  },
  preloadedState: INITIAL_STATE,
})