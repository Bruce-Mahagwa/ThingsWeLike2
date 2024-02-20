// dependencies
import { Link } from "react-router-dom";
import { useRef } from "react"
// files
import "./Navigation.css"   
// variables
const linkStyles = {
  "textDecoration": "none",
  "marginBottom": "0.5em"
}
const NavItem = ({ linkParent, linksChild, toggleNavItems }) => {
  // begin of use useRef to target the linkParent
  const linkParentRef = useRef(null)
  // end of useRef to target the linkParent
  let links = []
  for (let i in linksChild) {
    let item = linksChild[i];
    links.push(<Link className="nav-links" style={linkStyles} to={`/${item}`} key={i}>{i}</Link>)
  }
  return (
    // begin of nav item
    <div className="nav-item">
      {/*begin of nav item controls  */}
      <div className="nav-item-controls" onClick={() => toggleNavItems(linkParentRef)}>
        <button className="button-nav">{linkParent}</button>

      </div>
      {/*end of nav item controls  */}
      {/*begin of nav items container  */}
      <div className="nav-items-container" ref={linkParentRef}>
        {links}
      </div>
      {/*end of nav items container  */}
    </div>
    // end of nav item
  )
}

export default NavItem;