import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";


export default function Homepage() {
  const { isLoggedIn } = useContext(SessionContext);
  
  return (
    <>
      <div className="header">
        <h1> SkillHub </h1>
        <p>At Skill HuB, we believe that everyone <br/>
        has a unique set of skills and knowledge that can be shared with others.<br/>
        Our platform is designed to connect individuals with different skill sets and<br/>
        interests, creating a community where learning and personal growth are prioritized.<br/><br/>
        </p>
        {!isLoggedIn &&
        <div>
          <p  style={{ fontSize: '1.3rem', fontWeight: 500 }}>Join us now!</p>
          <Link className="genButton" to="/signup">Signup</Link>
          <Link className="genButton" to={"/login"}>Login</Link>
        </div>
        }

        {isLoggedIn &&
        <div>
          <p  style={{ fontSize: '1.3rem', fontWeight: 500 }}>Check our info out below!</p>
        </div>
        }
        

        
        
      </div>

      <div className="allLink allskills">
        <Link to={'/allskills'} >All Skills</Link>
      </div>
      <div className="allLink allevents">
        <Link to={'/allevents'} >All Events</Link>
      </div>
    </>
  );
}
