// files
import LogoNavigation from "./LogoNavigation";
import NavItem from "./NavItem";
import "./Navigation.css"
import { logoutUser } from "../../ReduxStore/Actions/UserActions";
import logo from "./Logo_3.png"
// dependencies
import { useRef, useState, useEffect } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
const Navigation = () => {
  // use useState to toggle the menu svg icon
  const [menuIconOpen, setMenuIconOpen] = useState(false);
  // use useRef to target the nav element
  const navigationRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const userInfo = user;
  let location = useLocation();
  // untoggles nav
  useEffect(() => {
    // whenever the page is changes the nav is untoggled
    navigationRef.current.classList.remove("toggle-main-nav")
    setMenuIconOpen((prev) => false);
    document.querySelectorAll(".nav-items-container").forEach((item) => {
      item.classList.remove("toggle-nav-items-container")
    })
  }, [location.pathname])

  function toggleMainMenu() {
    // toggles main menu
    // returns void
    navigationRef.current.classList.toggle("toggle-main-nav") // toggles nav
    setMenuIconOpen((prev) => !prev); // toggles svg icon
    document.querySelectorAll(".nav-items-container").forEach((item) => {
      item.classList.remove("toggle-nav-items-container")
    })
  }
  // end of use useRef to target the nav element

  // begin of function to toggle Nav Items
  function toggleNavItems(navItemsRef) {
    // toggle the nav items within the main menu items
    // returns void
    navItemsRef.current.classList.toggle("toggle-nav-items-container"); // toggles nav items
    document.querySelectorAll(".nav-items-container").forEach((item) => {
      if (navItemsRef.current !== item) {
        item.classList.remove("toggle-nav-items-container")
      }
    })
  }
  // end of function to toggle Nav Items
  return (
    <>
      <OutsideClickHandler
        onOutsideClick={() => {
          navigationRef.current.classList.remove("toggle-main-nav")
          setMenuIconOpen((prev) => false);
          document.querySelectorAll(".nav-items-container").forEach((item) => {
            item.classList.remove("toggle-nav-items-container")
          })
        }}
      >
        {/* // begin of header */}
        <header id="main-header">
          {/* begin of nav container */}
          <div className="nav-container">
            {/* begin of logo navigation */}
            <LogoNavigation toggleMainMenu={toggleMainMenu} menuIconOpen={menuIconOpen} />
            {/*end of logo navigation  */}
            {/*begin of nav  */}
            <nav className="main-nav" ref={navigationRef}>
              <>
                <NavItem linkParent={"Explore"} linksChild={{ "Home": "home", "Spaces": "spaces" }} toggleNavItems={toggleNavItems} />
                <NavItem linkParent={"Search"} linksChild={{ "Search": "search" }} toggleNavItems={toggleNavItems} />
                {userInfo?.userName && <NavItem linkParent={"Spaces"} linksChild={{ "Create Space": "user/createspace", "Find Space": "search" }} toggleNavItems={toggleNavItems} />}
                {!userInfo?.userName && <NavItem linkParent={"Spaces"} linksChild={{ "Find": "search" }} toggleNavItems={toggleNavItems} />}
                {!userInfo?.userName && <NavItem linkParent={"Account"} linksChild={{ "Login": "login" }} toggleNavItems={toggleNavItems} />}
                {userInfo?.userName && !userInfo?.isAdmin && <NavItem linkParent={"Profile"} linksChild={{ "Profile": "user", "My spaces": "user/spaces" }} toggleNavItems={toggleNavItems} />}
              </>
              {userInfo?.isAdmin &&
                <>
                  <NavItem linkParent={"Explore"} linksChild={{ "Spaces": "spaces" }} toggleNavItems={toggleNavItems} />
                  <NavItem linkParent={"Search"} linksChild={{ "Search": "search" }} toggleNavItems={toggleNavItems} />
                  {userInfo?.userName && <NavItem linkParent={"Spaces"} linksChild={{ "Create Space": "createspace", "Find Space": "search" }} toggleNavItems={toggleNavItems} />}
                  {!userInfo?.userName && <NavItem linkParent={"Spaces"} linksChild={{ "Find Space": "search" }} toggleNavItems={toggleNavItems} />}
                  <NavItem linkParent={"Admin"} linksChild={{ "Users": "admin/users", "Spaces": "admin/spaces" }} toggleNavItems={toggleNavItems} />
                </>
              }
              {userInfo?.userName && <div className="nav-item nav-logout-container">
                <button id="logout" onClick={() => dispatch(logoutUser())}>Logout</button>
              </div>}
            </nav>
            {/*end of nav  */}
          </div>
          {/*end of nav container  */}
        </header>
        {/* // end of header */}
      </OutsideClickHandler>
      <div id="header-banner">
        <div className="header-banner-content" style={{ "backgroundimage": `${logo}` }}>
        </div>
      </div>
    </>
  )
}
export default Navigation;