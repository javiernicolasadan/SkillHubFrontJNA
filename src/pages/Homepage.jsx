import { Link } from "react-router-dom";


export default function Homepage() {

  
  return (
    <>
      <div className="header">
        <h1> SkillHub </h1>
        <p>At Skill HuB, we believe that everyone <br/>
        has a unique set of skills and knowledge that can be shared with others.<br/>
        Our platform is designed to connect individuals with different skill sets and<br/>
        interests, creating a community where learning and personal growth are prioritized.<br/><br/>
        </p>
        <p>Join us now!</p> 
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/login"}>Login</Link>
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
