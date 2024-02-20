// files
import "./LoginRegister.css"
// dependencies
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
const Login = ({ loginUser }) => {
  // variables
  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState({
    success: "", error: "", loading: false, btnDisabled: false
  })
  const [formData, setFormData] = useState({
    email: "", password: "", doNotLogOut: false
  })
  const { error } = useSelector(state => state.users)
  // functions
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }
  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setLoginState({ success: "", loading: true, error: "", btnDisabled: true })
      dispatch(loginUser({ email: formData.email, password: formData.password, doNotLogOut: formData.doNotLogOut })).unwrap().then((res) => {
        setLoginState({ success: res.success, loading: false, error: "", btnDisabled: false })
        if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) {
          window.location.href = "/home"
        }
        else {
          window.location.href = "/admin/users"
        }
      }).catch((e) => {
        setLoginState({ success: "", loading: false, error: "We could not log you in at the moment. Please try again later", btnDisabled: false })
      }
      )
    }
    else {
      alert("Please fill all inputs")
    }
  }
  const handleLoginKeyDown = (e) => {
    if (e.key === "Enter") {
      return handleLogin();
    }
  }

  return (
    <main id="login">
      <div className="login-register-title">
        <h1>Login</h1>
        {(error || loginState.error) && <h3 style={{ color: "red" }}>{error || loginState.error}</h3>}
      </div>
      <div className="login-container">
        <div className="credentials-container">
          <input type="email" name="email" placeholder="Write a valid email please" className="credentials-input" onChange={handleChange} value={formData.email} />
          <input type="password" name="password" placeholder="Write a valid password please" className="credentials-input" onChange={handleChange} value={formData.password} />
          <label htmlFor="doNotLogOut">Do Not Logout
            <input type="checkbox" name="doNotLogOut" style={{ cursor: "pointer", padding: "0.2em", outline: "4px solid black", width: "1em", height: "1em", marginLeft: "1em", verticalAlign: "bottom" }} onChange={handleChange} checked={formData.doNotLogOut} />
          </label>
        </div>
        <div className="login-register-btn-container">
          {!loginState.loading && <button className="login-register-btn" onClick={handleLogin} onKeyDown={handleLoginKeyDown}>Login</button>}
          {loginState.loading && <h3>Loading ...</h3>}
        </div>
        <p>Don't have an account, register <Link to={"/register"}>here</Link></p>
      </div>
    </main>
  )
}
export default Login;