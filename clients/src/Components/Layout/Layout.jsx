// dependencies
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import axios from "axios";
// FILES
import HomePage from "../../Pages/Home/HomePage";
import ErrorMessage from "../Error/ErrorMessage";
const Layout = () => {
  // protected routes
  const [isAuth, setIsAuth] = useState("");
  const [error, setError] = useState("");
 
  useEffect(() => {
    axios.get("/get-token").then((res) => {
      setIsAuth(res.data.token);
    }).catch((e) => {
      setError(e.message);
    })
  }, [isAuth])
  
  if (!isAuth && !error) {
    return <HomePage />;
  }
  if (!isAuth && error) {
    return <ErrorMessage errorTitle={"Authentication Error"} errorMessage={`${error}. Please login to access this page or refresh the page. Sorry for the Inconvenience`} />;
  }
  if (isAuth) {
    return (
      <>
        <Outlet />
      </>
    )
  }
}
export default Layout;