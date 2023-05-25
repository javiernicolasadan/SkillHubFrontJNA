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
        console.log(data);
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

  useEffect(() => {
    console.log(upcomingEvents);
  }, [upcomingEvents]);

  return (
    <>
      <h1>Upcoming Events</h1>
    <div className="grid">
      {upcomingEvents ? (
      
          upcomingEvents.map((event) => (
            <div key={event._id} className="container">
              <Link to={`/eventdets/${event._id}`}>
                <h2>{event.title}</h2>
                <p>{event.locationType}</p>
                <p>{format(new Date(event.date), 'dd-MM-yyyy')}</p>
              </Link>
            </div>
          ))
        
      ) : (
        <p>Loading events...</p>
      )}
    </div>

    <div className="endLink">
            <Link to={'/allskills'} >Improve your skills</Link>
            </div>
    </>
  );
}
