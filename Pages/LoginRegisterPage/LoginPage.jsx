// files
import Login from "../../Components/LoginRegister/Login";
import { loginUser } from "../../ReduxStore/Actions/UserActions";
const LoginPage = () => {
  return (
    <Login loginUser={loginUser} />
  )
}
export default LoginPage;