import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
const currentDate = new Date()

export default function SkillDetails() {
  const { skillid } = useParams();
  const { currentUser } = useContext(SessionContext);
  const [skill, setSkill] = useState();
  const navigate = useNavigate()
  const [upcomingEvents, setUpcomingEvents] = useState()
  const [pastEvents, setPastEvents] = useState([]);

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
        <div className="fullWidthImg">
            <img src={skill.imageUrl} alt={skill.title}/>
        </div>

        <div className="details">
          <h1>Description of {skill.title}</h1>
          <p>{skill.details}</p>
          {(skill.createdBy === currentUser._id) && (
            <div className="ownerButton">
              <Link className="transButton" to={`/updateskill/${skillid}`}> Update skill</Link>
              <button className="transButton" type="button" onClick={handleDelete}>Delete skill</button>
            </div>
          )}
        </div>

      <div className="profileSection">
        <h3>Upcoming Events:</h3>
        <div className={`${upcomingEvents ? "grid" : "empty-grid"}`}>
        
        {(skill.createdBy === currentUser._id) && (
          <div className="sqcontainer" style={{ fontSize: "4rem", background: 'lightgrey', textAlign: 'center'}}>
                <Link to={`/addevent/${skillid}`} style={{ color: 'black' }}>+</Link>
          </div>)}
          
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((eachEvent) => (
              <div key={eachEvent._id} className="container">
                <Link to={`/eventdets/${eachEvent._id}`}>
                  <div className="sqcontainer">
                    <img src={eachEvent.imageUrl} alt={eachEvent.title} />
                  </div>
                  <div className="venueData">
                    <h2>{eachEvent.title}</h2>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No events</p>
          )}
          </div>
      </div>

      <div className="profileSection">
        <h3>Past Events:</h3>
        <div className={`${pastEvents.length > 0 ? "grid" : "empty-grid"}`}>
        {pastEvents.length > 0 ? (
          pastEvents.map((eachEvent) => (
            <div key={eachEvent._id} className="container">
            <Link to={`/eventdets/${eachEvent._id}`}>
              <div className="sqcontainer">
                <img src={eachEvent.imageUrl} alt={eachEvent.title} />
              </div>
              <div className="venueData">
                <h2>{eachEvent.title}</h2>
              </div>
              </Link>
              
                      
              
                    
            </div>
        
          ))
        ) : (
          <p>No past events found</p>
        )}
        </div>
      </div>

    </>
    
    ) : (<p>Loading</p>)}

    </>
);
}
