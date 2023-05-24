import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const currentDate = new Date()
  const { logout, currentUser } = useContext(SessionContext)
  
  let pastEvents = [];
  let upcomingEvents = [];

if(currentUser){
  if(currentUser.subscribedEvents.length > 0){
    pastEvents = currentUser.subscribedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate < currentDate;
    });
    
    upcomingEvents = currentUser.subscribedEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= currentDate;
    });
  }
 
}
  return (
    <>
      <div>Profile</div>
      <button type='button' onClick={logout}>Log Out</button>
      <Link to="/addskill">Add skill</Link>
      <Link to="/addevent">Add Event</Link>
      <div className="container">
  {currentUser ? (
    <>
      <h1>My Skills:</h1>
      {currentUser.skills.length > 0 ? (
        currentUser.skills.map((skill) => (
          <div key={skill._id}>
          <Link to={`//skilldets/${skill._id}`}>
            <h4>{skill.title}</h4>
            </Link>
          </div>
        ))
      ) : (
        <p>No skills to show</p>
      )}
    </>
  ) : (
    <p>Loading...</p>
  )}
</div>

      <div className="container">
        <h3>Upcoming Events:</h3>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div key={event._id}>
              <Link to={`/eventdets/${event._id}`}>
                <h4>{event.title}</h4>
              </Link>
            </div>
          ))
        ) : (
          <p>No upcoming events found</p>
        )}
      </div>

      <div className="container">
        <h3>Past Events:</h3>
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <div key={event._id}>
              <Link to={`/eventdets/${event._id}`}>
                <h4>{event.title}</h4>
              </Link>
            </div>
          ))
        ) : (
          <p>No past events found</p>
        )}
      </div>

    </>
  );
}