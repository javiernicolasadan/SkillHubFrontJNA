import { Link } from "react-router-dom";
import DropDown from "./DropDrown";

export default function Navbar() {
  return (
    <nav className="nav-menus">
      <div className="home">
        <Link to={"/"}>SkillHub</Link>
      </div>
      <DropDown />
    </nav>
  );
}
