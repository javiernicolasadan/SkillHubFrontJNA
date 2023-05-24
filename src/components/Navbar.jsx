import { Link } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function Navbar() {
  const { isLoggedIn } = useContext(SessionContext);

  return (
    <nav className="navBar">
      <Link to={"/"}>Home</Link>
      {isLoggedIn && <Link to="/profile">Profile</Link>}
      {isLoggedIn && <Link to="/allskills">Skills Venue</Link>}
      {isLoggedIn && <Link to="/allevents">Events Venue</Link>}
    </nav>
  );
}
