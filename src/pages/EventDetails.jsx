import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function EventDetails() {
  const { eventId } = useParams();
  const [oneEvent, setOneEvent] = useState();
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
  }, []);

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
      `http://localhost:5005/event/subscribe/${eventId}`,
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
        } else if (data.message === "Subscription successfull") {
          setMessage("Subscription successful");
          setNeedRefreshUser(true)
        }
      } else {
        setMessage("Error subscribing to event");
      } 
  };

  return oneEvent ? (
    <div>
      <div>{oneEvent.title}</div>
      <div>{oneEvent.description}</div>
      <div>{oneEvent.date}</div>
      <div>{oneEvent.locationType}</div>
      <img src={oneEvent.imageUrl} />
      <button onClick={handleEditEvent}>Edit Event</button>
      <button onClick={handleDeleteEvent}>Delete Event</button>
      <Link to={`/eventdets/${oneEvent._id}`}></Link>
      <button onClick={() => handleSubs(oneEvent._id)}>Subscribe</button>
      {message && <p>{message}</p>}
      <button onClick={() => handleSubs(oneEvent._id)}>Unsubscribe</button>

    </div>
  ) : (
    <h1>Loading....</h1>
  );
}
