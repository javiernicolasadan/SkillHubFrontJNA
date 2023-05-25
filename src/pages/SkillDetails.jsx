import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
const currentDate = new Date()

export default function SkillDetails() {
  const { skillid } = useParams();
  const { currentUser } = useContext(SessionContext);
  /* console.log(currentUser) */
  const [skill, setSkill] = useState();
  const navigate = useNavigate()
  const [upcomingEvents, setUpcomingEvents] = useState()
  const [pastEvents, setPastEvents] = useState([]);
  /* const [subsEvents, setSubsEvents] = useState([]) */

  const fetchSkill = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setSkill(parsed);

        if (parsed.events && parsed.events.length > 0) {
          const filteredEvents = parsed.events.filter((event) => {
          const eventDate = new Date(event.date) 
          return eventDate > currentDate
        });
          setUpcomingEvents(filteredEvents);    
          
          const filteredPastEvents = parsed.events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate < currentDate;
          });
          setPastEvents(filteredPastEvents);
      }
    }
    } catch (error) {
      console.log(error);
    }
  };
    
    useEffect(()=>{
      fetchSkill()
    },[])
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        navigate("/allSkills");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {skill ? (
      <>
      <div className="skill-dets">
        <div className="fullWidthImg">
        {skill.imageUrl &&
          <img src={skill.imageUrl} alt={skill.title}/>}
        </div>
        <br/>

        <div className="skill-dets">
          <h3>Details of {skill.title}</h3>
          <p>{skill.details}</p>
          <br/>
          <Link to={`/updateskill/${skillid}`}> Update </Link>
          <button type="button" onClick={handleDelete}>Delete</button>
          <Link to={`/addevent/${skillid}`}>Add event</Link>

        <h3>Upcoming Events:</h3>
        {upcomingEvents ? (
          upcomingEvents.map((eachEvent) => (
            <div key={eachEvent._id} className="eventDiv">
              <h4>{eachEvent.title}</h4>
              <p>{eachEvent.locationType}</p>
              <Link to={`/eventdets/${eachEvent._id}`}>More details</Link>

            </div>
          ))
        ) : (
          <p>No upcoming events found</p>
        )}

        <h3>Past Events:</h3>
        {pastEvents.length > 0 ? (
          pastEvents.map((eachEvent) => (
            <div key={eachEvent._id} className="eventDiv">
            <h4>{eachEvent.title}</h4>
              <p>{eachEvent.locationType}</p>
              <Link to={`/eventdets/${eachEvent._id}`}>More details</Link>
            </div>
          ))
        ) : (
          <p>No past events found</p>
        )}
    </div>
    </div>
      </>
      


    ) : (

    <p>Loading...</p>
    )
    }
  </>
);
}
