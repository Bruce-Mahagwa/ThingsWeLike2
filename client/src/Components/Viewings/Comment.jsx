// files
import "./Post.css"
import TimeAgo from "./TimeAgo";
const Comment = ({ description, postedAt, userName }) => {
  // this is a placeholder for a single comment
  // a user is not able to comment on the comment - feature will be added later
  return (
    <div className="comments-section-item single-post">
      <p>by {userName}</p>
      <TimeAgo date={postedAt} />
      <p>{description}</p>
    </div>
  )
}
export default Comment;