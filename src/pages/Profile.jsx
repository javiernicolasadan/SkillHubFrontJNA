import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import axios from "axios";
import { Link } from "react-router-dom";
const currentDate = new Date()


export default function Profile() {

  const {  currentUser } = useContext(SessionContext)
  
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
    {currentUser ? (
        <>
          <div className="userInfo">
              <img src="/images/myphoto.png"></img>
              <div className="userData">
                <h1>{currentUser.username}</h1>
                <h3>{currentUser.email}</h3>
              </div>
          </div>

          {/* <div>
            <h2>Welcome back {currentUser.username}</h2>
            <p>Email: {currentUser.email}</p>
            <p>Username: {currentUser.username}</p>
            <p>Skills offered: {currentUser.skills.length}</p>
            {upcomingEvents ?
              <p>Upcoming events: {upcomingEvents.length}</p>
              : <p>Upcoming events: 0</p>
            }
            
          </div> */}

          <div className="profileSection">
            <h2>Your offered skills:</h2>

            <div className="grid">
              <div className="container" style={{ fontSize: "4rem"}}>
              <Link to={'/addskill'} style={{ color: 'black' }}>+</Link></div>
              {currentUser.skills.length > 0 ? (
                currentUser.skills.map((skill) => (
                  <div key={skill._id} className="container">
                    <Link to={`/skilldets/${skill._id}`}>
                      <h2>{skill.title}</h2>
                    </Link>
                    {skill.imageUrl && (
                        <img src={skill.imageUrl} alt={skill.title} />
                    )}
                  </div>
                ))
              ) : (
                <p>No skills to show</p>
              )}
            </div>
          </div>


          <div className="profileSection">
            <h2>Upcoming Events:</h2>
            <div  className="grid">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div key={event._id} className="container">
                    <Link to={`/eventdets/${event._id}`}>
                      <h2>{event.title}</h2>
                    </Link>
                    {event.imageUrl && (
                        <img src={event.imageUrl} alt={event.title} />
                    )}
                  </div>
                ))
              ) : (
                <p>No upcoming events found</p>
              )}
            </div>

            <h2>Past Events:</h2>
            <div className="grid">
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                  <div key={event._id} className="container">
                    <Link to={`/eventdets/${event._id}`}>
                      <h2>{event.title}</h2>
                    </Link>
                    {event.imageUrl && (
                        <img src={event.imageUrl} alt={event.title} />
                    )}
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
      )}
  </>
);
}