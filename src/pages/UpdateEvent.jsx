import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateEvent() {
  const { eventId } = useParams()
  const navigate = useNavigate()

  const [updatedTitle, setUpdatedTitle] = useState("")
  const [updatedDate, setUpdatedDate] = useState("")
  const [updatedLocationType, setUpdatedLocationType] = useState("")
  const [updatedDescription, setUpdatedDescription] = useState("")

  
  const getEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/event/eventdets/${eventId}`
        );
        const event = response.data
        setUpdatedTitle(event.title)
        setUpdatedDate(event.date)
        setUpdatedLocationType(event.locationType)
        setUpdatedDescription(event.description)
      } catch (error) {
        console.log(error);
      }
  };
    
  useEffect(() => {
    getEventDetails()
  }, [eventId]);

  const handleUpdate = async (e) => {
    e.preventDefault()
    const payload = {
      title: updatedTitle,
      description: updatedDescription,
      date: updatedDate,
      locationType: updatedLocationType,
    };
    console.log(payload)
    try {
      const response = await axios.put(
        `http://localhost:5005/event/updateevent/${eventId}`,
        payload
      );
      if (response.status === 200) {
        navigate(`/eventdets/${eventId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label>Event Title:</label>
        <input
          type="text"
          name="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={updatedDate}
          onChange={(e) => setUpdatedDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Online/In-person:</label>
        <select
          type="text"
          name="locationType"
          value={updatedLocationType}
          onChange={(e) => setUpdatedLocationType(e.target.value)}
          required
        >
          <option value="online">Online</option>
          <option value="in-person">In-Person</option>
        </select>
      </div>

      <div>
        <button type="submit">Update Event</button>
      </div>
    </form>
  );
}

