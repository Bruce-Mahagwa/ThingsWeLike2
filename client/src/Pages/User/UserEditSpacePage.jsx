// files
import EditSpace from "../../Components/CreateSpace/EditSpace";
import { editSpace, getUserSpace } from "../../ReduxStore/Actions/SpaceActions";

const UserEditSpacePage = () => {
  return (
    <EditSpace editSpace={editSpace} getUserSpace={getUserSpace} />
  )
}
export default UserEditSpacePage;