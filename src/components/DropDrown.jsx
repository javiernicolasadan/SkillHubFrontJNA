import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function DropDown() {
  const { isLoggedIn } = useContext(SessionContext);
  const [isOpened, setIsopened] = useState(false);

  const toggleMenu = () => {
    // if (isOpened) {
    //  setIsopened(false)
    // } else {
    //   setIsopened(true)
    // }
    setIsopened(!isOpened);
  };

  return (
    <div className="dropDown">
      <div className="hamburger" 
        onClick={() => toggleMenu()}>
        <img src="/images/icon-menu.png"></img>
      </div>
      <nav className={`menu-container ${isOpened ? "opened" : "closed"} `}>
        <div className="nav-menus">
          {!isLoggedIn && <Link to="/signup">Signup</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && <Link to="/profile">Profile</Link>}
          {isLoggedIn && <Link to="/allskills">Skills Venue</Link>}
          {isLoggedIn && <Link to="/allevents">Events Venue</Link>}
        </div>
      </nav>
    </div>
  );
}
