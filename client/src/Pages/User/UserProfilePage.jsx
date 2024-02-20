// files
import Profile from "../../Components/Profile/Profile"
import { getUserProfile, saveUserProfile } from "../../ReduxStore/Actions/UserActions"
const UserProfilePage = () => {  
  return (
    <Profile getUserProfile={getUserProfile} saveUserProfile={saveUserProfile} />
  )
}
export default UserProfilePage;