// files
import "./Navigation.css"
import freelogo from "../../images/free-logo.jpg"
// dependecies  
import { Link } from "react-router-dom";
const LogoNavigation = ({ toggleMainMenu, menuIconOpen }) => {

  return (
    // begin of logo container
    <div className="logo-container">
      {/*begin of official logo  */}
      <div className="official-logo">
        <Link to={"/"}>
          <img src={freelogo} alt="logo of ifc" />
        </Link>
      </div>
      {/*end of official logo  */}
      {/*begin of toggle menu  */}
      <div className="toggle-menu" onClick={toggleMainMenu}>
        {!menuIconOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>}
      </div>
      {/*end of toggle menu  */}
    </div>
  )
}

export default LogoNavigation;