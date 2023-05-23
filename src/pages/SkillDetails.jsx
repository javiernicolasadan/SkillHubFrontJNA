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
      const response = await fetch(`http://localhost:5005/skill/${skillid}`);
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

    /* useEffect(()=>{
      console.log(skill)
    },[skill]) */
  

const handleDelete = async () => {
  try {
    const response = await fetch(`http://localhost:5005/skill/${skillid}`, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      navigate('/allSkills')
    }
  } catch (error) {
    console.log(error)
    
  }
}

const handleSubs = async(eventId)=>{
  const response = await fetch(`http://localhost:5005/event/subscribe/${eventId}`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId: currentUser._id})
  }
  )
}

  return (
    <>
      {skill ? (
      <div>
      <h1>Details of {skill.title}</h1>
          <h2>{skill.details}</h2>
          <Link to={`/update/${skillid}`}> Update </Link>
          <button type="button" onClick={handleDelete}>Delete</button>
          <Link to={`/addevent/${skillid}`}>Add event</Link>

          <h3>Upcoming Events:</h3>
          {upcomingEvents ? (
            upcomingEvents.map((eachEvent) => (
              <div key={eachEvent._id} className="eventDiv">
                <h4>{eachEvent.title}</h4>
                <p>{eachEvent.locationType}</p>
                <Link to={`/eventdets/${eachEvent._id}`}>More details</Link>
                <button onClick={() => (handleSubs(eachEvent._id))}>Subscribe</button>
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
                <button onClick={() => (handleSubs(eachEvent._id))}>Subscribe</button>
              </div>
            ))
          ) : (
            <p>No past events found</p>
          )}
      </div>

      ) : (

      <p>Loading...</p>
      )
      }
    </>
  );
}
