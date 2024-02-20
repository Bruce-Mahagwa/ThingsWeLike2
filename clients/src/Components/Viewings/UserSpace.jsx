// files
import "./Space.css";
import "./Post.css";
import Post from "./Post";
import Loading from "../Loading/Loading"
import ErrorMessage from "../Error/ErrorMessage"
import { clearPosts } from "../../ReduxStore/Slices/PostSlice"
// depends 
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"

const Space = ({ getSpace, isSpaceCreator }) => {
  const dispatch = useDispatch();
  const { spaceId } = useParams();
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState(false);
  const { userSpace, error } = useSelector(state => state.spaces); // gets the global state for a user space

  useEffect(() => {
    dispatch(clearPosts())  // clears the posts on space change so that we do not have posts beloging to other spaces in a different space
    setLoading(true)
    dispatch(getSpace({ url: "user", spaceId: spaceId })).unwrap().then((res) => { // we first get the space then we check if the user is its creator. if the user is the creator then we add the edit space link
      dispatch(isSpaceCreator({ spaceId: spaceId })).then((res) => {
        setLoading(false)
      }).catch((e) => {
        setLoading(false)
        setLocalError(true)
      })
    }).catch((e) => {
      setLoading(false)
      setLocalError(true)
    })
  }, [spaceId])

  if (loading) {
    return <Loading />
  }

  if (error || localError) {
    return <ErrorMessage errorTitle={"Fetching Data Error"} errorMessage={error || "Could not fetch post data. Please try again Later"} />
  }

  return (
    <main id="viewing">
      <Link to={`/user/spaces/`} className="back-link">BACK</Link>
      <div className="viewing-container-item">
        <div className="viewing-container-item-image-info">
          <img src={userSpace.data.avatar} alt={`image of ${userSpace.data.spaceName}`} className="viewing-container-item-image" />
          <div className="viewing-container-item-image-info-details user-space-details">
            <h1>{userSpace.data.spaceName}</h1>
            <p><span>{userSpace.data.members?.length}</span> Members</p>
            <Link to={`/user/spaces/${spaceId}/posts`} className="load-btn">Posts</Link>
          </div>
        </div>

        <div className="viewing-container-item-description">
          <p>{userSpace.data.description}</p>
        </div>

        <div className="viewing-container-item-albums">
          {userSpace.isCreator && <Link to={`/user/editspace/${spaceId}`} className="edit-btn">Edit</Link>}
        </div>
      </div>
    </main>
  )
}
export default Space;