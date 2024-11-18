// files
import "./Catalogue.css";  
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const CatalogueItem = ({ name, description, image, members, id, url }) => {

  const { user } = useSelector(state => state.users);  // to check whether we are in a logged in state or not. The we decide which url route to use, whether searchspaces or getspaces. 

  return (
    <div className="catalogue-list-item">
      {/* here the user is not logged in at all */}
      {!user?.userName && <Link to={`/${url}/${id}`}><img src={image} alt="picture" className="catalogue-list-item-image" /></Link>}
      {/* here the user is logged in but has not gone to his or her profile and access his or her spaces ie the route /spaces/:spaceId and /search/:spaceId */}
      {user.userName && url && <Link to={`/${url}/${id}`}><img src={image} alt="picture" className="catalogue-list-item-image" /></Link>}
      {/* here the user is logged in and is trying to access his or her spaces */}
      {user.userName && !url && <Link to={`/user/spaces/${id}`}><img src={image} alt="picture" className="catalogue-list-item-image" /></Link>}

      <div className="catalogue-list-item-details">
        <h1 className="catalogue-list-item-details-title">{name}</h1>
        <p>{description}</p>
        <div className="catalogue-list-item-details-meta-info">
          <p><span>{members} </span>Members</p>
        </div>
      </div>
    </div >
  )
}
export default CatalogueItem;