import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns'

const currentDate = new Date();

export default function Allevents() {
  const [upcomingEvents, setUpcomingEvents] = useState();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/event`
      );
      if (response.status === 200) {
        const data = response.data;
        const filteredUpcomingEvents = data.filter(
          (event) => new Date(event.date) >= currentDate
        );

        setUpcomingEvents(filteredUpcomingEvents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  return (
    <div className="venue">
    <h1>Upcoming Events</h1>
    <div className="categoryMenu">
            <select className="form-select" onChange={(event)=>(setSelectedCategory(event.target.value))}>
                <option value='All'>MAKE IT WORK All categories</option>
                <option>Music</option>
                <option>Photography</option>
                <option>Coding</option>
                <option>Cooking</option>
                <option>Gardening</option>
                <option>Beauty</option>
                <option>Domestic-Skills</option>
                <option>Languages</option>
                <option>Other</option>
            </select>
        </div>

    <div className="grid">
      {upcomingEvents ? (
      
          upcomingEvents.map((event) => (
            <div key={event._id} className="container">
              <Link to={`/eventdets/${event._id}`}>
              <div className="sqcontainer">
                <img src={event.imageUrl} alt={event.title} />
              </div>

              <div className="venueData">
                <h2>{event.title}</h2>
              </div>
              </Link>
            </div>
          ))
        
      ) : (
        <p>Loading events...</p>
      )}
    </div>

    <div className="homeButtonDiv" style={{textAlign: 'center'}}>
            <Link to={'/allskills'} className="transButton">See all skills</Link>
            </div>
    </div>
  );
}
