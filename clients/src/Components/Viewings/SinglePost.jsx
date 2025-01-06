// files
import "./Post.css"
import Loading from "../Loading/Loading"
import ErrorMessage from "../Error/ErrorMessage"
import ReplyPost from "./ReplyPost"
import Comment from "./Comment"
import "./SinglePost.css"
import TimeAgo from "./TimeAgo";
import { clearPosts } from "../../ReduxStore/Slices/PostSlice";
import { clearComments } from "../../ReduxStore/Slices/CommentSlice";
import { pusher } from "../../Pusher/pusher";
// dependencies 
import { useSelector, useDispatch } from "react-redux"
import { useSearchParams, useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react"
import { getCommentsFromSocketIo } from "../../ReduxStore/Slices/CommentSlice";
import InfiniteScroll from 'react-infinite-scroll-component';

const SinglePost = ({ getPost, getComments }) => {
  const { postId, spaceId } = useParams();
  const dispatch = useDispatch();
  const { post, error } = useSelector(state => state.posts);
  const { comments } = useSelector(state => state.comments);
  const { user } = useSelector(state => state.users)

  const [manageSocketUpdates, setManageSocketUpdates] = useState(false); // sigals that we need to add comments from socket io to regular commments
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(false);
  const [commentPortal, setCommentPortal] = useState(false);
  const [loadComments, setLoadComments] = useState(false);
  const [loadDuringPostComments, setLoadDuringPostComments] = useState(false);
  const [page, setPage] = useSearchParams();
  const [hasMore, setHasMore] = useState(true);

  let pageNum = page.get("pageNum") || 1;
  const scrollToView = useRef(null);

  useEffect(() => {
    dispatch(clearPosts()); // we do this to ensure that any residual posts data is cleared when leaving the post page
    setLoading(true) // we set our loading true
    dispatch(getPost({ prefix: "spaces", spaceId: spaceId, postId: postId })).then((res) => { // we fetch the post here 
      setLoading(false) // set loading false
    }).catch((e) => {
      setLoading(false); // set loading false
      setLocalError(true) // localError is different from server error
    })
  }, [postId])

  const fetchComments = () => {
    if (pageNum > 1 && comments.data.length === 0 || manageSocketUpdates) {
      // here we check if page has been refreshed. in that case we fetch all posts until the pageNumber
      dispatch(clearComments()) // we empty the comment state array because we expect to fetch all comments up to pageNum
      setLoadComments(true)
      dispatch(getComments({ spaceId: spaceId, postId: postId, pageNum: pageNum, isRefreshed: true })).then((res) => {
        setLoadComments(false);
      }).catch((e) => {
        setLoadComments(false);
        setLocalError(true)
      })
    } 
    else {      
      setLoadComments(true)
      setManageSocketUpdates(false) // ensures that we skip the first if statement
      dispatch(getComments({ spaceId: spaceId, postId: postId, pageNum: pageNum })).then((res) => { // normal fetching of comments
        setLoadComments(false);
      }).catch((e) => {
        setLoadComments(false);
        setLocalError(true)
      })
    }
  }

  useEffect(() => {
    return fetchComments() // fetch comments according to changes in pageNum
  }, [pageNum]);


  function handleChange(e) {
    // this handles the change of page for comments
    if (comments.pageNum * comments.pageSize >= comments.total) {
      setHasMore(false);
      return;
    }
    let val = Number(pageNum) + 1;
    const requiredComments = pageNum * comments.pageSize; // calculats number of comments that should be visible incase user comments using socket io. we need to recalculate the pageNum
    setManageSocketUpdates(false);
    if (comments.data.length > requiredComments) {
      // checks for a refresh and fetches pcomments up to pageNum
      // if the pageNum is greater than 1 and the posts array is empty then we know that the page has been refreshed
      // if we have more posts than those that are required it means that socket io has been used to fetch the posts and we need to readjust the pageNum accordingly.
      const extraComments = comments.data.length - requiredComments; // calculates the number of posts that are left to be loaded
      let commentsToBeAdded = 0;
      if (extraComments > 0) {
        commentsToBeAdded = extraComments;
        const pagesToBeAdded = Math.ceil(commentsToBeAdded / comments.pageSize);
        setManageSocketUpdates(true) // ensures that we have a flag showing that we need to fetch data from socket io
        let val = pagesToBeAdded + Number(pageNum) + 1 // the one caters for the comments in the next page
        setPage({ pageNum: val });
      }
    }
    else {
      setPage({ pageNum: val });
    }
  }
  const openCommentPortal = () => {
    // function to open commentPortal
    setCommentPortal(true)
  }

  const closeCommentPortal = () => {
    // function to close commentPortal
    setCommentPortal(false)
  }

  useEffect(() => {
    const channel = pusher.subscribe("thingswelike")
    channel.bind("commentsInComments", ((comments) => {
      dispatch(getCommentsFromSocketIo(comments))
      setLoadDuringPostComments(false);
    }))
    channel.bind("pusher:subscription_error", (error) => {
      console.log(error, "error from pusher")
      setLoadDuringPostComments(false);
    });
    return () => {
      channel.unbind("commentsInComments")
    }
  }, [comments])


  if (loading) {
    return <Loading />
  }

  if (error || localError) {
    return <ErrorMessage errorTitle={"Fetching Data Error"} errorMessage={error || "Could not fetch post data. Please try again Later"} />
  }

  let postWriter = "";
  if (post.data._id) {
    // we get the author of the post so that we check whether he can make a comment or not
    let owner = post.data.owner[0]
    postWriter = owner.userName
  }
  return (
    <main id="single-post-page">
      <Link to={`/user/spaces/${spaceId}/posts`} style={{ marginBottom: "1em" }}>BACK</Link>
      <div className="main-post-container">
        <div className="main-post">
          <h4>{postWriter || ""}</h4>
          <TimeAgo date={post.data.postedAt} />
          <p>{post.data.description}</p>
          {user.userName !== postWriter && <div className="main-post-links">
            <button className="load-btn" onClick={openCommentPortal}>Write Comment</button>
          </div>}
        </div>
      </div>

      {commentPortal && (<ReplyPost closeCommentPortal={closeCommentPortal} spaceId={spaceId} postId={postId} commentPortal={commentPortal} loadDuringPostComments={loadDuringPostComments} setLoadDuringPostComments={setLoadDuringPostComments} />)}

      <div className="comments" id = "comments">
        <h2>Comments</h2>
        <div className="comments-section" ref={scrollToView}>
          <InfiniteScroll
            dataLength={comments.data.length}
            next = {handleChange}
            hasMore = {hasMore}
            endMessage = {<h4>No more comments</h4>}
            scrollableTarget = {document.getElementById("comments")}
          >
            {comments.data.length > 0 && comments.data.map((comment) => {
              return (
                <Comment key={comment._id} owner={comment.owner} description={comment.comment} postedAt={comment.postedAt} userName={comment?.userName} />
              )
            })}
          </InfiniteScroll>
        </div>
        {loadComments && <Loading />}
        <div className="main-post-links">
        </div>
      </div>
    </main>
  )
}

export default SinglePost;
