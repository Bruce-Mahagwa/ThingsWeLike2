// files
import Register from "../../Components/LoginRegister/Register";
import { registerUser } from "../../ReduxStore/Actions/UserActions";
const RegisterPage = () => {
  // functions


  return (
    <Register registerUser={registerUser} />
  )
}
export default RegisterPage;