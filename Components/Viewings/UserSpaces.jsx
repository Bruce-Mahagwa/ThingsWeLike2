// files
import CatalogueItem from "../Catalogue/CatalogueItem";
import "../Catalogue/Catalogue.css";
import Loading from "../Loading/Loading";
import ErrorMessage from "../Error/ErrorMessage";
// depend
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"

const UserSpaces = ({ getUserSpaces }) => {

  const { userSpaces, error } = useSelector(state => state.spaces); // we get all userspaces belonging to the user
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getUserSpaces()).then((res) => { // we fetch the spaces here
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
      setLocalError(true)
    })
  }, [dispatch])

  if (loading) {
    return (
      <>
        <h2 className="title">My Spaces</h2>
        <Loading />
      </>
    )
  }

  if (error || localError) {
    return <ErrorMessage errorTitle={"Fetching Data Error"} errorMessage={error || "Could Not Load Resource. Please try again Later"} />
  }

  return (
    <>
      <h2 className="title">My Spaces</h2>
      <div className="catalogue-list-container">
        {userSpaces.data.map((space) => {
          return (
            <CatalogueItem
              key={space.spaceName} image={space.avatar} description={space.description} name={space.spaceName} members={space.members.length} id={space._id}
            />
          )
        })}
        {userSpaces.data.length === 0 && (
          <h1 className="title not-joined-msg">You Have Not Joined Any Space. Please Join One in the Explore Page. Thank You.</h1>
        )}
      </div>
    </>
  )
}
export default UserSpaces;