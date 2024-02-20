// files
import "./Profile.css";
import ErrorMessage from "../Error/ErrorMessage"
// dependencies
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Profile = ({ getUserProfile, saveUserProfile }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { userProfile, error } = useSelector(state => state.users); // we get the user's profile from global state
  const [addPic, setAddPic] = useState(false); // used to add new profile pic
  const [profile, setProfile] = useState({ // carries the profile state
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    avatar: userProfile?.avatar || "",
    description: userProfile?.description || "",
  });

  useEffect(() => {
    if (profile.firstName === "") { // first line makes sure that we do not fetch the profile unnecessarily
      dispatch(getUserProfile()).unwrap().then((res) => {
        setProfile((prev) => { // we set the profile based on the user's previous input
          return {
            ...prev,
            firstName: res.firstName,
            lastName: res.lastName,
            avatar: res.avatar,
            description: res.description
          }
        })
      })
    }
  }, [dispatch])

  function handleChange(event) {
    // runs the handle change event which saves the inputs from the form
    const { name, value, type, checked } = event.target;
    setProfile(prevProfile => {
      return {
        ...prevProfile,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  const saveProfile = async () => {
    // saves user profile
    try {
      setLoading(true)
      await dispatch(saveUserProfile({ firstName: profile.firstName, lastName: profile.lastName, avatar: profile.avatar, description: profile.description }))

      await dispatch(getUserProfile()) // once saved we fetch the user's profile again
      setLoading(false)
    }
    catch (e) {
      setLoading(false)
    }
  }

  if (error) {
    return <ErrorMessage errorTitle={"Fetching Error"} errorMessage={error} />
  }
  return (
    <main id="user-profile">
      <div className="user-profile-container">
        {!error && <h3 style={{ textAlign: "center" }}>You have saved your profile successfully</h3>}
        <h3>Profile Picture</h3>
        <div className="add-avatar">
          <img src={addPic === false ? profile?.avatar : "#"} alt="avatar" className="user-profile-avatar" />
          {!addPic && <button onClick={() => setAddPic(true)}>Change photo</button>}
          {addPic &&
            <div className="avatar-input">
              <input type="text" name="avatar" value={profile.avatar} onChange={handleChange} placeholder="Enter a URL for your profile picture" />
              <button onClick={() => setAddPic(false)}>Add</button>
            </div>
          }
        </div>

        <div className="user-profile-details">
          <h3>User Details</h3>
          <label htmlFor="first-name">First Name</label>
          <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
          <label htmlFor="second-name">Last Name</label>
          <input type="text" name="lastName" onChange={handleChange} value={profile.lastName} />
          <label htmlFor="describe-self">Describe yourself</label>
          <textarea placeholder="Describe your interests" onChange={handleChange} value={profile.description} name="description"></textarea>
        </div>
        <div>
          {!loading && <button onClick={saveProfile}>Save Profile</button>}
          {loading && <p>Loading ...</p>}
        </div>

      </div>
    </main>
  )
}
export default Profile;