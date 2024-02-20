// files
import Posts from "../../Components/Viewings/Posts";
import { getPosts } from "../../ReduxStore/Actions/PostActions";
const UserPostsPage = () => {
  return (
    <Posts getPosts={getPosts} />  
  )
}
export default UserPostsPage;