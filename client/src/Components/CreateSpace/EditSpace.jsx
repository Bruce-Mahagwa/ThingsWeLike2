// files
import "./CreateSpace.css"
import "../Profile/Profile.css"
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading/Loading";
// dependencines 
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

const EditSpace = ({ editSpace, getUserSpace }) => {
  // variables
  const { spaceId } = useParams()
  const dispatch = useDispatch();
  // state
  const { userSpace, error } = useSelector((state) => state.spaces);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(false)
  const [addPic, setAddPic] = useState(false);
  const [space, setSpace] = useState({
    spaceName: userSpace.spaceName || "",
    category: userSpace.category || "",
    avatar: userSpace.avatar || "",
    description: userSpace.description || ""
  })

  useEffect(() => {
    setLoading(true)
    dispatch(getUserSpace({ spaceId })).unwrap().then((res) => {
      setSpace((prev) => {
        return {
          ...prev,
          spaceName: res.data.spaceName,
          category: res.data.category,
          avatar: res.data.avatar,
          description: res.data.description,
        }
      })
      setLoading(false)
    }).catch((e) => {
      setLocalError(true)
      setLoading(false)
    })
  }, [dispatch])

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setSpace(prevSpaceData => {
      return {
        ...prevSpaceData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(editSpace({ spaceId: spaceId, ...space })).then((res) => {
      setLoading(false)
      setSuccess(true);
    }).catch((e) => {
      setLoading(false);
      setLocalError(true);
    })
  }

  if (loading) {
    return <Loading />
  }
  if (error || localError) {
    return <ErrorMessage errorTitle={"Creating Space Error"} errorMessage={error || "Could not edit space at the moment. Please try again later"} />
  }
  if (success) {
    return <Navigate to={`/user/spaces/${spaceId}`} />
  }

  return (
    <main id="createspace">
      <div className="createspace-container">
        <div>
          <h1>Edit Space</h1>
        </div>
        <div className="createspace-details">
          <h2>Space Details</h2>
          {success && <div style={{ color: "green" }}><h2>Space Updated Successfully</h2></div>}
          <label htmlFor="space-name">Name of the new space</label>
          <input type="text" name="spaceName" onChange={handleChange} value={space.spaceName} />
          <label htmlFor="space-category">Name of the category</label>
          <input type="text" name="category" onChange={handleChange} value={space.category} />
          <label htmlFor="avatar">Add Link to Avatar</label>
          <div className="add-avatar">
            <img src={addPic === false ? space?.avatar : "#"} alt="avatar" className="user-profile-avatar" />
            {!addPic && <button onClick={() => setAddPic(true)}>Change photo</button>}
            {addPic &&
              <div className="avatar-input">
                <input type="text" name="avatar" onChange={handleChange} value={space.avatar} />
                <button onClick={() => setAddPic(false)}>Add</button>
              </div>
            }
          </div>
          <label htmlFor="description">Describe the space</label>
          <textarea name="description" onChange={handleChange} value={space.description}></textarea>
        </div>
        <div>
          {!loading && <button onClick={handleSubmit}>Editing Space</button>}
          {loading && <button disabled>Editing Space...</button>}
        </div>
      </div>
    </main>
  )
}
export default EditSpace;