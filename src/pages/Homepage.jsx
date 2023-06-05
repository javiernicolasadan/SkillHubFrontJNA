import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";


export default function Homepage() {
  const { isLoggedIn } = useContext(SessionContext);
  
  return (
    <>
      <header>
        <img className="neonLogo" src="/images/logo white.png"/>
        <p>Welcome to SkillHub, the ultimate platform for expanding your knowledge and mastering new skills. Whether you're an aspiring professional, a lifelong learner, or simply curious about the world, SkillHub offers a diverse range of resources to help you reach your full potential. Let's dive in together and embrace the power of knowledge!
        </p>        
      </header>

      <section id="about">
        <h2>ABOUT</h2>
        <p>
        SkillHub is a global platform dedicated to accessible learning for all. With diverse courses for all skill levels, expert instructors, and interactive experiences, we create a comprehensive and enjoyable learning environment. Join us now to unlock knowledge, excel in your career, and broaden your horizons. Let SkillHub be your trusted companion on your learning journey. Together, we can achieve greatness!
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
