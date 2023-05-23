import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const currentDate = new Date()



export default function Allevents() {
    const [upcomingEvents, setUpcomingEvents] = useState()
    

    const fetchEvents = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/event`) 
          if (response.status === 200) {
          const data = response.data
          console.log(data)
          const filteredUpcomingEvents = data.filter(
            (event) => new Date(event.date) >= currentDate,
          ) 
          
          setUpcomingEvents(filteredUpcomingEvents);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchEvents()
      }, [])

    /*   useEffect (() => {
    console.log(upcomingEvents)
      },[upcomingEvents]) */

  return (
    <div>
      <Link to={'/allskills'} >See all the skills</Link>
      <h1>Upcoming Events</h1>
      {upcomingEvents ? (
        

        <ul>
          {upcomingEvents.map((event) => (
            <li key={event._id}>
              <h2>{event.title}</h2>
              <p>Date: {event.date}</p>
              <p>Location: {event.locationType}</p>
              <img src={event.imageUrl} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading events...</p>
      )}
    </div>
  );
}
