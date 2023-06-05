import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";


export default function Homepage() {
  const { isLoggedIn } = useContext(SessionContext);
  
  return (
    <>
      <header>
        <img className="neonLogo" src="/images/logo white.png"/>
        <p>Welcome to SkillHub, the ultimate platform for expanding knowledge and mastering new skills. Discover endless possibilities as an aspiring professional, lifelong learner, or curious explorer. Let's dive into the power of knowledge together!
        </p>        
      </header>

      <section id="about">
        <h2>ABOUT</h2>
        <p>
        SkillHub is a global platform dedicated to accessible learning for everyone. With diverse courses, expert instructors, and interactive experiences, we foster comprehensive and enjoyable learning environments. Join us now to unlock knowledge, excel in your career, and broaden your horizons. Let SkillHub be your trusted companion on the journey to greatness!
        </p>

        {!isLoggedIn &&
        <div>
          <p  style={{ fontSize: '1.3rem', fontWeight: 500 }}>Join us now!</p>
          <Link className="genButton whiteButton" to="/signup">Signup</Link>
          <Link className="genButton whiteButton" to={"/login"}>Login</Link>
        </div>
        }

        {isLoggedIn &&
        <div>
          <p  style={{ fontSize: '1.3rem', fontWeight: 500 }}>Check our info out below!</p>
        </div>
        }

      </section>

      <div className="allLink allskills">
        <Link to={'/allskills'} >All Skills</Link>
      </div>
      <div className="allLink allevents">
        <Link to={'/allevents'} >All Events</Link>
      </div>
    </>
  );
}
