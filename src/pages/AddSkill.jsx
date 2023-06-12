import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SessionContext } from "../contexts/SessionContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AddSkill({ isUpdating = false }) {
  const { currentUser , setNeedRefreshUser} = useContext(SessionContext);
  const [newCategory, setCategory] = useState("Other");
  const [newTitle, setTitle] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const navigate = useNavigate();
  const { skillid } = useParams()
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");

  const fetchSkill = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`);
      const data = await response.json();
      setCategory(data.category);
      setTitle(data.title);
      setNewDetails(data.details);
      setPreviewImageUrl(data.imageUrl);
      setOriginalImageUrl(data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isUpdating && skillid) {
      fetchSkill();
    }
  }, [isUpdating, skillid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fData = new FormData() 
        const imageUrl = e.target.imageUrl.files[0]
        fData.append("title", newTitle )
        fData.append("details", newDetails)
        fData.append("category", newCategory) 
        fData.append("createdBy", currentUser._id)
               
        if (imageUrl) {
           fData.append("imageUrl", imageUrl)
          setPreviewImageUrl(URL.createObjectURL(imageUrl));
        } else {
          if (!imageUrl && originalImageUrl) {
            fData.append("originalImageUrl", originalImageUrl);
          }
        }
        /* console.log(imageUrl) */

    try {
      
      let response
      if (isUpdating && skillid) {
        response = await axios.put(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`, fData)
      } else {
        response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/skill/create`, fData)
      }
      if (response.status === 201 || response.status === 200) {
        const newSkill = await response.data;
        console.log(newSkill)
        setNeedRefreshUser(true)
        navigate(`/skilldets/${newSkill._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create">
      <h1>{isUpdating ? "Update your skill here" : "Add your skill here"}</h1>
     
      <form className="pageForms" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="categoryMenu">
          <label className="form-label">Category:</label>
          <select className="form-select" name="category" value={newCategory} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Other">Other</option>
            <option value="Music">Music</option>
            <option value="Photography">Photography</option>
            <option value="Coding">Coding</option>
            <option value="Cooking">Cooking</option>
            <option value="Gardening">Gardening</option>
            <option value="Beauty">Beauty</option>
            <option value="Domestic-Skills">Domestic-Skills</option>
            <option value="Languages">Languages</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input className="form-control" type="text" name="title" value={newTitle} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" name="details" value={newDetails} onChange={(e) => setNewDetails(e.target.value)} required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image:</label>
           <input className="form-control" type="file" accept="image/jpg,image/png" name="imageUrl" />
            {previewImageUrl && <img src={previewImageUrl} alt="Preview" />}
        </div>

        <div className="submitDiv">
        <button className="transButton">{isUpdating ? "Update skill" : "Add skill"}</button>
        </div>
      </form>
    

    </div>
  );
}
