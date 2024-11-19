// files
import "./Post.css"
import Post from "./Post";
import Loading from "../Loading/Loading"
import ErrorMessage from "../Error/ErrorMessage";
import { clearComments } from "../../ReduxStore/Slices/CommentSlice";
import { getPostsFromSocketIo, clearPosts } from "../../ReduxStore/Slices/PostSlice"
import CreatePost from "./CreatePost";
import { pusher } from "../../Pusher/pusher"
// depende 
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react"
import { useParams, useSearchParams, Link, ScrollRestoration } from "react-router-dom"

const Posts = ({ getPosts }) => {
  const dispatch = useDispatch()
  const { posts, error, spaceName } = useSelector(state => state.posts)
  const { spaceId } = useParams();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useSearchParams(); // captures the page Number
  const [localError, setLocalError] = useState(false);
  const [manageSocketUpdates, setManageSocketUpdates] = useState(false); // sigals that we need to add posts from socket io to regular posts
  const [loadDuringPosting, setLoadDuringPosting] = useState(false); // handles the loading state when a suser is submitting a posr
  const [postPortal, setPostPortal] = useState(false); // handles the state for opening the text area where a user can make a post

  const scrollToView = useRef(null);

  let pageNum = page.get("pageNum") || 1;

  useEffect(() => {
    dispatch(clearComments()) // this clears the comments array in state when a user leaves the page so that residual comments are not added to other posts
    if (pageNum > 1 && posts.data.length === 0 || manageSocketUpdates) {

      // checks for a refresh and fetches posts up to pageNum
      // if the pageNum is greater than 1 and the posts array is empty then we know that the page has been refreshed
      // if we have more posts than those that are required it means that socket io has been used to fetch the posts and we need to readjust the pageNum accordingly.
      dispatch(clearPosts()) // clears any posts in state during refresh or during fetching from socket io
      window.scrollTo(0, 0) // scrolls to the top of the page
      setLoading(true)
      dispatch(getPosts({ prefix: "spaces", spaceId: spaceId, pageNum: pageNum ? pageNum : 1, isRefreshed: true })).then((res) => { // has the isRefreshed flag set to true so that we alert the backend that the page has been refreshed
        setLoading(false)
      }).catch((e) => {
        console.log(e)
        setLoading(false)
        setLocalError(true)
      })
    }
    else {
      scrollToView.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" }) // necessary because the page resets to the top when the page is changed. needs to be fixed
      setManageSocketUpdates(false) // ensures that we skip the first if statement
      setLoading(true)
      dispatch(getPosts({ prefix: "spaces", spaceId: spaceId, pageNum: pageNum ? pageNum : 1 })).then((res) => {
        setLoading(false)
      }).catch((e) => {
        console.log(e)
        setLoading(false)
        setLocalError(true)
      })
    }
  }, [spaceId, pageNum])


  function handleChange(e) {
    // calculates pageNum
    e.preventDefault()
    let val = Number(pageNum) + 1; // default pageNum
    const requiredPosts = pageNum * posts.pageSize; // calculats number of posts that should be visible incase user posts using socket io. we need to recalculate the pageNum
    setManageSocketUpdates(false);
    if (posts.data.length > requiredPosts) {
      // checks for a refresh and fetches posts up to pageNum
      // if the pageNum is greater than 1 and the posts array is empty then we know that the page has been refreshed
      // if we have more posts than those that are required it means that socket io has been used to fetch the posts and we need to readjust the pageNum accordingly.
    
      window.scrollTo(0, 0) // scrolls to the top of the page
      const extraPosts = posts.data.length - requiredPosts; // calculates the number of posts that are left to be loaded
      
      let postsToBeAdded = 0;
      if (extraPosts > 0) {
        postsToBeAdded = extraPosts;
        const pagesToBeAdded = Math.ceil(postsToBeAdded / posts.pageSize);
      
        setManageSocketUpdates(true) // ensures that we have a flag showing that we need to fetch data from socket io
        let val = pagesToBeAdded + Number(pageNum) + 1 // the one caters for the posts in the next page
        
        setPage({ pageNum: val });
      }
    }
    else {
      setPage({ pageNum: val });
    }
  }
  
  const openPostPortal = () => {
    // opens posting portal
    setPostPortal(true)
  }

  const closePostPortal = () => {
    // closes posting portal
    setPostPortal(false)
  }

  useEffect(() => {    
    const channel = pusher.subscribe("thingswelike")
    channel.bind("postsInPosts", ((posts) => {
      dispatch(getPostsFromSocketIo(posts))
      setLoadDuringPosting(false)
    }))
    channel.bind("pusher:subscription_error", (error) => {
      console.log(error, "error from pusher")
    });
    return () => {
      channel.unbind("postsInPosts")
    }
  }, [posts])
  if (error || localError) {
    return <ErrorMessage errorTitle={"Fetching Data Error"} errorMessage={error || "Could Not Load Resource. Please try again Later"} />
  }

  return (
    <main id="posts">
      <div className="posts-container" ref={scrollToView}>
        <Link to={`/user/spaces/${spaceId}`} style={{ display: "block", marginBottom: "0.5em" }}>BACK</Link>
        <button onClick={openPostPortal} className="load-btn">Write Post</button>
        <h2 style={{ textAlign: "center", marginBottom: "1em" }} className='title'>{spaceName}</h2>
        {posts.data.length > 0 && posts.data.map((post) => {
          return (
            <Post key={post._id} description={post.description} owner={post.owner[0].userName} postedAt={post.createdAt} postId={post._id ? post._id : null} spaceId={spaceId} />
          )
        })}

      </div>
      {loading && <Loading />}
      {posts.pageNum * posts.pageSize < posts.total && <button onClick={handleChange} className="load-btn" style = {{marginLeft: "1em"}}>Load More</button>}
      {postPortal && (<CreatePost closePostPortal={closePostPortal} spaceId={spaceId} postPortal={postPortal} setLoadDuringPosting={setLoadDuringPosting} loadDuringPosting={loadDuringPosting} />)}
    </main>
  )
}
export default Posts;
