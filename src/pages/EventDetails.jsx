import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function EventDetails() {
  const { eventId } = useParams();
  const [oneEvent, setOneEvent] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { currentUser,  setNeedRefreshUser } = useContext(SessionContext);
  const navigate = useNavigate();

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API_URL}/event/eventdets/${eventId}`
      );
      setOneEvent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  
    if (currentUser && currentUser.subscribedEvents && currentUser.subscribedEvents.length > 0) {
      const subscribedEventIds = currentUser.subscribedEvents.map(event => event._id);
      setIsSubscribed(subscribedEventIds.includes(eventId));
    }
  }, [currentUser, eventId]);
  

  const handleEditEvent = () => {
    navigate(`/updateevent/${eventId}`);
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_API_URL}/event/deleteevent/${eventId}`
      );
      navigate("/allskills");
    } catch (error) {
      console.log(error);
    }
  };

  const [message, setMessage] = useState(null);

  const handleSubs = async (eventId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/event/subscribe/${eventId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser._id }),
      });
      if (response.status === 200) {
        const data = await response.json();
        if (data.message === "Subscription deleted") {
          setMessage("Subscription deleted");
          setNeedRefreshUser(true)
          navigate("/profile")
        } else if (data.message === "Subscription successfull") {
          setMessage("Subscription successful");
          setNeedRefreshUser(true)
          navigate("/profile")
        }
        
      } else {
        setMessage("Error subscribing to event");
      } 
  };

  return oneEvent ? (
    <>
      <div className="fullWidthImg">
        <img src={oneEvent.imageUrl} alt={oneEvent.title}/>
      </div>
          
      <div className="details">
        <h1>Details of {oneEvent.title}</h1>
        <p>{oneEvent.description}</p>
        <p><h3>Date:</h3>{oneEvent.date}</p>
        <p><h3>Location type:</h3>{oneEvent.locationType}</p>

        
        {/* fix createdby and owner buttons */}
        {(currentUser._id) && (
          <div className="ownerButton">
            <button className="transButton" onClick={handleEditEvent}>Update Event</button>
            <button className="transButton" onClick={handleDeleteEvent}>Delete Event</button>
          </div>
        )}
      </div>
      
          <div>
          {/* fix subscribe to events when owner */}
          {isSubscribed && <button className="transButton" onClick={() => handleSubs(oneEvent._id)}>Unsubscribe</button>}
          {!isSubscribed && <button className="transButton" onClick={() => handleSubs(oneEvent._id)}>Subscribe</button>}
          </div>
      

    </>
  ) : (
    <h1>Loading....</h1>
  );
}
