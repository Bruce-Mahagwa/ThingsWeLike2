// files
import Space from "../../Components/Viewings/Space";
import { getSpace, joinSpace } from "../../ReduxStore/Actions/SpaceActions";
import { getPosts } from "../../ReduxStore/Actions/PostActions";
const SpacePage = () => {
  return (
    <Space getSpace={getSpace} getPosts={getPosts} joinSpace={joinSpace} />
  )
}
export default SpacePage;