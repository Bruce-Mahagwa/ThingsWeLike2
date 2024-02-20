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
  const { user } = useSelector(state => state.users);
  const name = user?.userName;

  useEffect(() => {
    axios.get("/get-token").then((res) => {
      setIsAuth(res.data.token);
    }).catch((e) => {
      setError(e.message);
    })
  }, [isAuth])
  if (name || isAuth) {
    return (
      <>
        <Outlet />
      </>
    )
  }
  if (!isAuth && !error) {
    return <HomePage />;
  }

  if (!isAuth && error) {
    return <ErrorMessage errorTitle={"Authentication Error"} errorMessage={`${error}. Please logout and login again. Sorry for the Inconvenience`} />;
  }
}
export default Layout;