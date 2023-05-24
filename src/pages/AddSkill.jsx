import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SessionContext } from "../contexts/SessionContext";
import { useParams } from "react-router-dom";

export default function AddSkill({ isUpdating = false }) {
  const { currentUser , setNeedRefreshUser} = useContext(SessionContext);
  const [newCategory, setCategory] = useState("Other");
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const navigate = useNavigate();
  const { skillid } = useParams()
  console.log(skillid)


  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`);
        const data = await response.json();
        setCategory(data.category);
        setTitle(data.title);
        setDescription(data.details);
      } catch (error) {
        console.log(error);
      }
    };

    if (isUpdating && skillid) {
      fetchSkill();
    }

  }, [isUpdating, skillid]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      category: newCategory,
      title: newTitle,
      details: newDescription,
      createdBy: currentUser._id,
    };
    try {
      let response;
      if (isUpdating && skillid) {
        response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (response.status === 201 || response.status === 200) {
        const newSkill = await response.json();
        setNeedRefreshUser(true)
        navigate(`/skilldets/${newSkill._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>{isUpdating ? "Update your Skill" : "Create a new"}</h1>
     <div className="pageForms">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={newCategory}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Other">Other</option>
            <option value="Music">Music</option>
            <option value="Photography">Photography</option>
            <option value="Coding">Coding</option>
            <option value="Cooking">Cooking</option>
            <option value="Gardening">Gardening</option>
            <option value="Beauty">Beauty</option>
          </select>
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newDescription}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button>{isUpdating ? "Update" : "Create"}</button>
      </form>
      </div>
    </>
  );
}
