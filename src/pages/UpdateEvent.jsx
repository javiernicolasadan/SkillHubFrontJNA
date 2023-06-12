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
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");

  
  const getEventDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/event/eventdets/${eventId}`
        );
        const event = response.data
        setUpdatedTitle(event.title)
        setUpdatedDate(event.date)
        setUpdatedLocationType(event.locationType)
        setUpdatedDescription(event.description)
        setPreviewImageUrl(event.imageUrl);
        setOriginalImageUrl(event.imageUrl);
      } catch (error) {
        console.log(error);
      }
  };
    
  useEffect(() => {
    getEventDetails()
  }, [eventId]);

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    const fData = new FormData() 
        const imageUrl = e.target.imageUrl.files[0]
        fData.append("title", updatedTitle )
        fData.append("date", updatedDate)
        fData.append("locationType", updatedLocationType)
        fData.append("description", updatedDescription)
        /* fData.append("skillTitle", selectedSkill.title ) */
        fData.append("eventId", eventId )
        if (imageUrl) {
          fData.append("imageUrl", imageUrl);
          setPreviewImageUrl(URL.createObjectURL(imageUrl));
        } else {
          if (!imageUrl && originalImageUrl) {
            fData.append("originalImageUrl", originalImageUrl);
          }
        }
        
        console.log(imageUrl)

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_API_URL}/event/updateevent/${eventId}`,
        fData
      );
      if (response.status === 200) {
        navigate(`/eventdets/${eventId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create">
    <h1>Update event</h1>

    <form className="pageForms" onSubmit={handleUpdate}>
      <div className="mb-3">
        <label className="form-label">Event Title:</label>
        <input className="form-control"
          type="text"
          name="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea className="form-control"
          type="text"
          name="description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Date:</label>
        <input className="form-control"
          type="date"
          name="date"
          value={updatedDate}
          onChange={(e) => setUpdatedDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Online/In-person:</label>
        <select className="form-select"
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

      <div className="mb-3">
      <label className="form-label">Image:</label>
        <input className="form-control" type="file" accept="image/jpg,image/png" name="imageUrl" />
      
      {previewImageUrl && <img src={previewImageUrl} alt="Preview" />}
    </div>

      <div className="submitDiv">
        <button type="submit" className="transButton">Update Event</button>
      </div>
    </form>
    </div>
  );
}

