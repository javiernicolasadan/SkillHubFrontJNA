import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Link } from "react-router-dom";
import ChangePic from "../components/ChangePic";
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
              
                <img className="centeredProfilePic" src={currentUser.imageUrl}></img>
              
              <div className="userData">
                <div>
                  <h1>{currentUser.username}</h1>
                  <h3>{currentUser.email}</h3>
                </div>
                <div className="updUserIcon">
                  <ChangePic />
                </div>
              </div>
              
          </div>

          <div className="profileSection">
            <h3>Your offered skills:</h3>

            <div className="grid">
              <div className="sqcontainer" style={{ fontSize: "4rem", background: 'rgb(241, 241, 241)', textAlign: 'center'}}>
              <Link to={'/addskill'} style={{ color: 'black' }}>+</Link></div>
              
              {currentUser.skills.length > 0 && (
                currentUser.skills.map((skill) => (
                  <div key={skill._id} className="container">
                  <Link to={`/skilldets/${skill._id}`}>
                    <div className="sqcontainer">
                        <img src={skill.imageUrl} alt={skill.title} />
                    </div>
                    <div className="venueData">
                              <h2>{skill.title}</h2>
                      </div>
                  </Link>
                  </div>
                ))
              )}
            </div>
          </div>


          <div className="profileSection">
            <h3>Upcoming Events:</h3>
            <div className={`${upcomingEvents.length > 0 ? "grid" : "empty-grid"}`}>
            
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                <div className="container" key={event._id}>
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
                <>
                  <p>No upcoming events found</p>
                  <Link to={'/allevents'}>Check all our upcoming events</Link>
                </>
          
              )}
            </div>
          </div>

          <div className="profileSection">
            <h3>Past Events:</h3>
            <div className={`${pastEvents.length>0 ? 'grid' : 'empty-grid' }`}>
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
                <div className="container" key={event._id}>
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