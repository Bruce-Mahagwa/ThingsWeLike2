// files
import "./CreatePost.css"
import ErrorMessage from "../Error/ErrorMessage";
import { createPost } from "../../ReduxStore/Actions/PostActions";
// dependencies  
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"

const CreatePost = ({ closePostPortal, spaceId, postPortal, loadDuringPosting, setLoadDuringPosting }) => {
  const [localError, setLocalError] = useState(false);
  const [postData, setPostData] = useState({
    description: ""
  })
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.posts)
  const { user } = useSelector(state => state.users);

  const submitPost = () => {
    if (postData.description.length === 0) {
      return null;
    }
    try {
      // socket io
      setLoadDuringPosting(true);
      // socket.emit("writePostInPosts", { description: postData.description, owner: [{ memberId: user._id, userName: user.userName }], postedAt: new Date(), spaceId: spaceId, userId: user._id, userName: user.userName });
      // socket io
      dispatch(createPost({ spaceId, description: postData })).unwrap().then((res) => {
      }).catch((e) => {
        console.log(e)
        setLocalError(true)
        setLoadDuringPosting(false);
      })
    }
    catch (e) {
      setLocalError(true)
      setLoadDuringPosting(false);
    }
  }

  useEffect(() => {
    // automatically focuses the text area for posting
    if (postPortal) {
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 reviewbox-close-icon" onClick={closePostPortal}>
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="textarea-rating-container">
          <h2>Add Post</h2>
          <div className="reviewbox-textarea">
            <textarea placeholder="Please write a review with a minimum length of 100 words" value={postData.description} onChange={(e) => setPostData({ description: e.target.value })} className="write-post"></textarea>
          </div>

          <div>
            {!loadDuringPosting && <button className="post-review" onClick={submitPost}>Post</button>}
            <button className="post-review" style={{ background: "red", marginLeft: "1em" }} onClick={closePostPortal}>Cancel</button>
            {loadDuringPosting && "Loading..."}
          </div>

        </div>
      </div>
    </article>
  )
}
export default CreatePost;
