// files
import "./Space.css";
import "./Post.css";
import Post from "./Post";
import Loading from "../Loading/Loading"
import ErrorMessage from "../Error/ErrorMessage"
// depends 
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"

const Space = ({ getSpace, getPosts, joinSpace }) => {
  const dispatch = useDispatch();
  const { spaceId } = useParams();
  const [loading, setLoading] = useState(false)
  const [joinLoading, setJoinLoading] = useState(false) // when user joins space we need to set a loading state
  const [localError, setLocalError] = useState(false);
  const [joinError, setJoinError] = useState(false); // in case of an error during joining space such as when the user is already in the space
  const [joinSuccess, setJoinSuccess] = useState(""); // holds the success message for when a user successfully joins a space
  const { user } = useSelector(state => state.users)

  useEffect(() => {
    // here we fetch both the space and the first 10 posts. the user will have to log in to see more posts. The 10 posts is set accoding to the space's page size
    setLoading(true)
    dispatch(getSpace({ url: "getspaces", spaceId: spaceId })).unwrap().then((res) => {
      dispatch(getPosts({ prefix: "posts", spaceId: spaceId })).unwrap().then((res) => { // we also fetch the first 10 posts only and the user will have to log in to see more posts
        setLoading(false)
      }).catch((e) => {
        setLoading(false)
        setLocalError(true);
      })
    }).catch((e) => {
      setLoading(false)
      setLocalError(true)
    })
  }, [spaceId]) // dependent on only when a user goes to a single space page

  const { space, error } = useSelector(state => state.spaces);
  const { posts } = useSelector(state => state.posts);

  const joinNewSpace = () => {
    setJoinLoading(true);
    dispatch(joinSpace({ spaceId: spaceId })).unwrap().then((res) => {
      setJoinLoading(false);
      setJoinSuccess("You have successfully joined this space. You can now make posts and comments. Enjoy")
    }).catch((e) => {
      setJoinLoading(false);
      setJoinError(true);
    })
  }

  if (loading) {
    return <Loading />
  }

  if (error || localError) {
    return <ErrorMessage errorTitle={"Fetching Data Error"} errorMessage={error || "Could Not Load Resource. Please try again Later or refresh the page"} />
  }
  const membersLength = space.data?.members?.length || ""; // gets how many members are in the space
  return (
    <main id="viewing">
      {joinError && <h2 style={{ color: "red", textAlign: "center", margin: "1em 0" }}>You already are a member of this space.</h2>}
      {joinSuccess && <h2 style={{ color: "green", textAlign: "center", margin: "1em 0" }}>{joinSuccess}</h2>}
      <div id="viewing-container">
        <div className="viewing-container-item">
          <div className="viewing-container-item-image-info">
            <img src={space.data.avatar} alt={`image of ${space.data.spaceName}`} className="viewing-container-item-image" />
            <div className="viewing-container-item-image-info-details">
              <h1>{space.data.spaceName}</h1>
              <p><span>{membersLength}</span> Members</p>
              {user.userName && !joinLoading && <button className="load-btn" onClick={joinNewSpace}>Join Space</button>}
              {user.userName && joinLoading && <button className="load-btn">Loading...</button>}
            </div>

          </div>

          <div className="viewing-container-item-description">
            <p>{space.data.description}</p>
          </div>

          <div className="viewing-container-item-albums">
            <h1>Top Posts</h1>
            <article id="posts">
              <div className="posts-container">
                {posts.data.length > 0 && posts.data.map((post) => {
                  return (
                    <>
                      <Post description={post.description} owner={post.owner[0].userName} postedAt={post.createdAt} />
                    </>
                  )
                })}

              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Space;