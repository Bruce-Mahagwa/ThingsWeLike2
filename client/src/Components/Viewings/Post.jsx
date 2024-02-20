// files
import "./Post.css"
import TimeAgo from "./TimeAgo";
// depend
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"; 
const Post = ({ description, postedAt, owner, spaceId, postId }) => {

  const { user } = useSelector(state => state.users);

  return (
    <div className="single-post">
      <div className="single-post-owner">
        <p><span>by </span>{owner}</p>
      </div>
      <p>{description}</p>
      <div className="single-post-links">

        <TimeAgo date={postedAt} />
        {user?.userName && postId && <Link to={`/user/spaces/${spaceId}/posts/${postId}`}>View Post</Link>}
      </div>
    </div>
  )
}
export default Post;