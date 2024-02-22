// files
import "./CreateSpace.css"
import "../Profile/Profile.css"
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading/Loading";
// dependencines
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const CreateSpace = ({ createSpace }) => {
  // cvariables
  const { user, error } = useSelector((state) => state.users);
  const [space, setSpace] = useState({
    spaceName: "",
    category: "",
    avatar: "",
    description: "",
    createdBy: user._id,
    userName: user.userName,
    userId: user._id
  })
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spaceId, setSpaceId] = useState("");
  const [addPic, setAddPic] = useState(false);
  const dispatch = useDispatch();
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
    const elements = document.querySelectorAll("input, textarea")
    for (let i of elements) {
      if (i.value === "") {
        i.classList.add("error");
        i.focus();
        i.placeholder = "Please fill in this value"
        return;
      }
      i.classList.remove("error");
    }
    setLoading(true)
    dispatch(createSpace(space)).then((res) => {
      setSpaceId(res.data.data._id)
      setLoading(false)
      setSuccess(true);
    }).catch((e) => {
      setLoading(false);
    })
  }

  if (error) {
    return <ErrorMessage errorTitle={"Creating Space Error"} errorMessage={error} />
  }
  if (success) {
    return <Navigate to={`/user/spaces/${spaceId}`} />
  }
  
  return (
    <main id="createspace">
      <div className="createspace-container">
        <div>
          <h1>Create Space</h1>
        </div>
        <div className="createspace-details">
          <h2>Space Details</h2>
          {success && <div style={{ color: "green" }}><h2>Space Created Successfully</h2></div>}
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
          {!loading && <button onClick={handleSubmit}>Create Space</button>}
          {loading && <button disabled>Creating Space...</button>}
        </div>
      </div>
    </main>
  )
}
export default CreateSpace;
