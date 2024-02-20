// files
import CreateSpace from "../../Components/CreateSpace/CreateSpace";
import { createSpace } from "../../ReduxStore/Actions/SpaceActions";
// dependencies
import axios from "axios";

const UserCreateSpacePage = () => {
  return (
    <CreateSpace createSpace={createSpace} />
  )
}
export default UserCreateSpacePage;