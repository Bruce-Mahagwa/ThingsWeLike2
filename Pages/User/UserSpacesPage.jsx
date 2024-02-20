// files
import UserSpaces from "../../Components/Viewings/UserSpaces";
import { getUserSpaces } from "../../ReduxStore/Actions/SpaceActions";

const UserSpacesPage = () => {  
  return (
    <UserSpaces getUserSpaces={getUserSpaces} />   
  )
}
export default UserSpacesPage;