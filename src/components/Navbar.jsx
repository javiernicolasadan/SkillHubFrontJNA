import { Link } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import DropDown from "./DropDrown";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(SessionContext);

  return (
    <nav>
      <div>
        <Link to={"/"}>Home</Link>
      </div>
      <DropDown />

      {/* <div className="navMenus">
      {!isLoggedIn && <Link to="/signup">Signup</Link>}
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {isLoggedIn && <Link to="/profile">Profile</Link>}
      {isLoggedIn && <Link to="/allskills">Skills Venue</Link>}
      {isLoggedIn && <Link to="/allevents">Events Venue</Link>}
      </div> */}
    </nav>
  );
}
