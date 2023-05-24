import { Link } from "react-router-dom";


export default function Homepage() {

  
  return (
    <>
      <div className="header">
      <h1> Skill Hub </h1>
      <h2>At Skill HuB, we believe that everyone <br/>
      has a unique set of skills and knowledge that can be shared with others.<br/>
      Our platform is designed to connect individuals with different skill sets and<br/>
      interests, creating a community where learning and personal growth are prioritized.<br/><br/>
     <span>Join us Now!</span> 
      </h2>
      <Link to={"/signup"}>Signup</Link>
      <Link to={"/login"}>Login</Link>
      </div>
    </>
  );
}
