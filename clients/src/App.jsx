// files
import HeaderPage from "./Pages/Header/HeaderPage";
import HomePage from "./Pages/Home/HomePage";
import HomePageLoggedIn from "./Pages/Home/HomePageLoggedIn";
import RegisterPage from "./Pages/LoginRegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginRegisterPage/LoginPage";
import SpacesPage from "./Pages/Spaces/SpacesPage";
import SpacePage from "./Pages/Spaces/SpacePage";
import SearchPage from "./Pages/Search/SearchPage";

import UserProfilePage from "./Pages/User/UserProfilePage";
import UserSpacesPage from "./Pages/User/UserSpacesPage";
import UserSpacePage from "./Pages/User/UserSpacePage"
import UserPostsPage from "./Pages/User/UserPostsPage"
import UserPostPage from "./Pages/User/UserPostPage";
import UserCreateSpacePage from "./Pages/User/UserCreateSpacePage"
import UserEditSpacePage from "./Pages/User/UserEditSpacePage"

import Layout from "./Components/Layout/Layout"
import AdminSpacesPage from "./Pages/Admin/AdminSpacesPage"
import AdminUsersPage from "./Pages/Admin/AdminUsersPage"
import FooterPage from "./Pages/Footer/FooterPage"
import ScrollTop from "./Utils/ScrollTop";
import ErrorMessage from "./Components/Error/ErrorMessage";
import './App.css'
//  dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"


export default function App() {
  // default axios urls and settings
  // axios.defaults.baseURL = "https://a62cd8cb-6249-47ab-8ce2-89e6d92956a3-00-2so2id1sckb1k.picard.replit.dev"
  // axios.defaults.baseURL = "https://thingswelikeapi.onrender.com"
  axios.defaults.baseURL = "https://things-we-like-api.vercel.app"
  axios.defaults.withCredentials = true;

  return ( 
    <BrowserRouter>
      <ScrollTop /> 
      <main class = "container">
        <HeaderPage />
        {/*first route not logged in  */}
        <div style = {{flex: 1}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:spaceId" element={<SpacePage />} />
            <Route path="/spaces" element={<SpacesPage />} />
            {/*above - will have a page of spaces first  */}
            <Route path="/spaces/:spaceId" element={<SpacePage />} />
            {/*  will have a single  space in the category*/}
            
            {/*end of first route not logged in  */}

            {/*second route user is not admin  */}
            <Route element={<Layout />} admin={false}>
              <Route path="/home" element={<HomePageLoggedIn />} />
              <Route path="/user" element={<UserProfilePage />} />
              <Route path="/user/spaces" element={<UserSpacesPage />} />
              <Route path="/user/spaces/:spaceId" element={<UserSpacePage />} />
              <Route path="/user/spaces/:spaceId/posts" element={<UserPostsPage />} />
              <Route path="/user/spaces/:spaceId/posts/:postId" element={<UserPostPage />} />
              
              <Route path="/user/createspace" element={<UserCreateSpacePage />} />
              <Route path="/user/editspace/:spaceId" element={<UserEditSpacePage />} />
            </Route>
            {/*end of second route user is not admin  */}
            {/*third route user is admin  */}
            <Route element={<Layout />} admin={true}>
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/spaces" element={<AdminSpacesPage />} />
            </Route>
            {/*end of third route user is admin  */}
            <Route path="*" element={<ErrorMessage errorMessage={"Route Not Found"} errorTitle="No Routes Match This Location. Please go back to the HomePage. Thank You. " />} />
          </Routes>
        </div>
        
        <FooterPage />
      </main>
    </BrowserRouter>
  )
}
