// files
import UserSpace from "../../Components/Viewings/UserSpace";
import { getSpace, isSpaceCreator } from "../../ReduxStore/Actions/SpaceActions"
import { getPosts } from "../../ReduxStore/Actions/PostActions";
const UserSpacePage = () => {
  return (  
    <UserSpace getSpace={getSpace} getPosts={getPosts} isSpaceCreator={isSpaceCreator} />
  )
}
export default UserSpacePage;