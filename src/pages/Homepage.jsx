import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";


export default function Homepage() {
  const { isLoggedIn } = useContext(SessionContext);
  
  return (
    <>
      <header>
        <div>
          <img className="neonLogo" src="/images/logo white.png"/>
          <p>Welcome to SkillHub, the ultimate platform for expanding knowledge and mastering new skills. Discover endless possibilities as an aspiring professional, lifelong learner, or curious explorer. Let`s dive into the power of knowledge together!
          </p>  
        </div>
      </header>

      <section id="about">
      <img className="aboutImg" src="https://www.cnb.csic.es/media/k2/items/cache/babfabc324898098b0ab92678d27d9e5_XL.jpg"/>
      
      <div className="aboutData">
      <h2>ABOUT</h2>
        <p>
        SkillHub is a global platform dedicated to accessible learning for everyone. With diverse courses, expert instructors, and interactive experiences, we foster comprehensive and enjoyable learning environments. Join us now to unlock knowledge, excel in your career, and broaden your horizons. Let SkillHub be your trusted companion on the journey to greatness!
        </p>
      
        

        {!isLoggedIn &&
        <div>
          <p  style={{ fontSize: '1.3rem', fontWeight: 500 }}>Join us now!</p>
          <div className="homeButtonDiv">
            <Link className="homeButton" to="/signup">Signup</Link>
            <Link className="homeButton" to={"/login"}>Login</Link>
          </div>
          
        </div>
        }

        {isLoggedIn &&
        <div>
          <p  style={{ fontSize: '1.3rem', fontWeight: 500 }}>Check our info out below!</p>
        </div>
        }
        </div>
      </section>

      <section className="homeSection">

        <div className="openUserDiv">
          <h3>Explore Our Vast Skill List</h3>
          <p>Unlock a World of Knowledge: Browse our extensive collection of skills to discover what you can learn before signing up. Expand your horizons today!
          </p>
          <div className="homeButtonDiv">
            <Link to={'/allskills'} className="transButton" >View All Skills</Link>
          </div>
        </div>

        <div className="openUserDiv">
          <h3>Upcoming Events</h3>
          <p>Join Our Exciting Events: Explore our upcoming events and get involved in a vibrant community of learners. Find inspiration, connect with experts, and broaden your horizons!
          </p>
          <div className="homeButtonDiv">
            <Link to={'/allevents'} className="transButton">View All Events</Link>
          </div>
        </div>
      </section>

      
      
    </>
  );
}
