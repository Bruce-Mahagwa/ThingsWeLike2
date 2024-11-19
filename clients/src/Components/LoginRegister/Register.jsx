// files
import "./LoginRegister.css";
// dependeincies
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// functions
import { clearUserLoginRegister } from "../../ReduxStore/Slices/UserSlice";

const Register = ({ registerUser }) => {
  // variables
  const dispatch = useDispatch();
  const [registerState, setRegisterState] = useState({
    success: "", error: "", loading: false, btnDisabled: false
  })
  const [formData, setFormData] = useState({
    email: "", password: "", userName: "", confirmPassword: ""
  })

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

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(clearUserLoginRegister())
    if (formData.email && formData.password && formData.userName && formData.password === formData.confirmPassword) {
  
      setRegisterState({ success: "", loading: true, error: "", btnDisabled: true })
      dispatch(registerUser({ userName: formData.userName, email: formData.email, password: formData.password })).unwrap().then((res) => {
        setRegisterState({ success: res.data.success, loading: false, error: "", btnDisabled: false })
      }).catch((e) => {
        setRegisterState({ success: "", loading: false, error: "We could not register you at the moment. Please try again later", btnDisabled: false })
        console.log(e)
      }
      )
    }
    else {
      alert("Please fill all inputs")
    }
  }
  const handleRegisterKeyDown = (e) => {
    if (e.key === "Enter") {
      return handleRegister();
    } 
  }
  const { error } = useSelector(state => state.users)
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearUserLoginRegister())
      }, [7000])
      return () => clearTimeout(timer);
    }

  }, [])
  return (
    <main id="login"> 
      <div className="login-register-title">
        <h1>Register</h1>
        {(error || registerState.error) && <h3 style={{ color: "red" }}>{error || registerState.error}</h3>}
      </div>
      <div className="login-container">
        <div className="credentials-container">
          <input type="text" name="userName" placeholder="Please pick a username" className="credentials-input" value={formData.userName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Write a valid email please" className="credentials-input" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Write a valid password please" className="credentials-input" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Repeat the password please" className="credentials-input" value={formData.confirmPassword} onChange={handleChange} />
          {formData.password !== formData.confirmPassword && <p style={{ color: "red", marginTop: "0.5em" }}>Both Passwords need to Match</p>}
        </div>
        <div className="login-register-btn-container">
          {!registerState.loading && <button className="login-register-btn" onClick={handleRegister} onKeyDown={handleRegisterKeyDown}>Register</button>}
          {registerState.loading && <h3>Loading ...</h3>}
        </div>
        <p>Already have an account, login <Link to={"/login"}>here</Link></p>
      </div>
    </main>
  )
}

export default Register;