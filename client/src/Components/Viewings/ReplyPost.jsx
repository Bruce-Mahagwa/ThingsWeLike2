// files
import "./CreatePost.css"
import ErrorMessage from "../Error/ErrorMessage"
import { socket } from "../../Socketio/socket"
// dependencies
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"

const ReplyPost = ({ closeCommentPortal, spaceId, postId, commentPortal, setLoadDuringPostComments, loadDuringPostComments }) => {
  const [localError, setLocalError] = useState(false);
  const { error } = useSelector(state => state.posts)
  const { user } = useSelector(state => state.users);
  const [commentData, setCommentData] = useState({
    description: ""
  })
  // const dispatch = useDispatch();
  const submitComment = () => {
    if (commentData.description.length === 0) {
      return null;
    }
    try {
      setLoadDuringPostComments(true);
      // socket io
      socket.emit("writeComment", { comment: commentData.description, owner: user._id, userName: user.userName, postedAt: new Date(), postId: postId });
      // socket io
      // dispatch(createComment({ postId, comment: commentData })).unwrap().then((res) => {
      //   setLoading(false)
      //   closeCommentPortal();
      // }).catch((e) => {
      //   setLocalError(true)
      //   setLoading(false)
      // })
    }
    catch (e) {
      setLocalError(true)
      setLoadDuringPostComments(false);
    }
  }
  useEffect(() => {
    // automatically focuses the text area for posting comments
    if (commentPortal) {
      document.querySelector(".write-post").focus();
    }
  }, [])

  if (error || localError) {
    return <ErrorMessage errorTitle={"Fetching Data Error"} errorMessage={error || "Could Not Load Resource. Please try again Later"} />
  }
  return (
    <article id="reviewbox">
      <div className="reviewbox-container">
        <div className="reviewbox-close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 reviewbox-close-icon" onClick={closeCommentPortal}>
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="textarea-rating-container">
          <div className="reviewbox-textarea">
            <textarea placeholder="Please write a review with a minimum length of 100 words" value={commentData.description} onChange={(e) => setCommentData({ description: e.target.value })} className="write-post"></textarea>
          </div>

          <div>
            {!loadDuringPostComments && <button className="post-review" onClick={submitComment}>Post</button>}
            <button className="post-review" style={{ background: "red", marginLeft: "1em" }} onClick={closeCommentPortal}>Cancel</button>"
            {loadDuringPostComments && "Loading..."}
          </div>

        </div>
      </div>
    </article>
  )
}
export default ReplyPost;