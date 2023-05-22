import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EventDetails() {
  const  { eventId }  = useParams();
  const [ oneEvent, setOneEvent] = useState()
  const navigate = useNavigate()

  const getDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/event/eventdets/${eventId}`
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
      await axios.delete(`http://localhost:5005/event/deleteevent/${eventId}`);
      navigate("/allskills"); 
    } catch (error) {
      console.log(error);
    }
  };

  return   oneEvent ? 
  ( 
    <div>
      <div>{oneEvent.title}</div>
      <div>{oneEvent.description}</div>
      <div>{oneEvent.date}</div>
      <div>{oneEvent.locationType}</div>    
      <button onClick={handleEditEvent}>Edit Event</button>  
      <button onClick={handleDeleteEvent}>Delete Event</button>  
    </div>
  ) : (<h1>Loading....</h1>)
}

