// files
import SinglePost from "../../Components/Viewings/SinglePost";
import { getPost } from "../../ReduxStore/Actions/PostActions";
import { getComments } from "../../ReduxStore/Actions/CommentActions";

const UserPostPage = () => {

  return (
    <SinglePost getPost={getPost} getComments={getComments} />
  )
}
export default UserPostPage;