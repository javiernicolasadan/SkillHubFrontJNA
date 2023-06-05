import { Link } from "react-router-dom";
import Hamburguer from "./Hamburguer";
import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const {isLoggedIn, logout} = useContext(SessionContext)

  const toggleMenu = ()=>{
    setMenuOpen(!menuOpen)
  }

  return (
    <nav>
      <div>
        <Link to={"/"}>
          <img className="navLogo" src='/images/logo black.png'/>
        </Link>
      </div>

      <Hamburguer />

      <div className="navAllMenus">
        {!isLoggedIn && <Link to="/signup">Signup</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <Link to="/profile">Profile</Link>}
        {isLoggedIn && <Link to="/allskills">Skills Venue</Link>}
        {isLoggedIn && <Link to="/allevents">Events Venue</Link>}
        {isLoggedIn && <button onClick={logout}>Logout</button>}
      </div>

    </nav>
  );
}

