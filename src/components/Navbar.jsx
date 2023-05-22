import { Link } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";


export default function Navbar() {

  const {isLoggedIn} = useContext(SessionContext)


  return (
    <nav>
    <Link to={'/'}>Home</Link>
      {isLoggedIn && <Link to="/profile">Profile</Link>}
      {isLoggedIn && <Link to="/allskills">All skills</Link>}
    </nav>
  )
}
