import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const currentDate = new Date()

export default function SkillDetails() {
  const { skillid } = useParams();
  const navigate = useNavigate()
  const [skill, setSkill] = useState();
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

  useEffect(() => {
    fetchSkill();
  }, []);

  /* useEffect(() => {
    console.log(skill);
  }, [skill]); */


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

  return (
    <>
      {skill ? (
        <div>
          <h1>Details of {skill.title}</h1>
          <h2>{skill.details}</h2>
          {/* <Link to={`/update/${skillid}`}> Update </Link> */}
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/addevent/${skillid}`}>Add event</Link>

          <h3>Upcoming Events:</h3>
          {upcomingEvents ? (
            upcomingEvents.map((event) => (
              <div key={event._id}>
                <h4>{event.title}</h4>
              </div>
            ))
          ) : (
            <p>No upcoming events found</p>
          )}

          <h3>Past Events:</h3>
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <div key={event._id}>
                <h4>{event.title}</h4>
              </div>
            ))
          ) : (
            <p>No past events found</p>
          )}
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
