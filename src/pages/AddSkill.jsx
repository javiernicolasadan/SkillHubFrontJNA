
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AddSkill({ isUpdating = false, skillid }) {
  const [newCategory, setCategory] = useState("Other");
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      category: newCategory,
      title: newTitle,
      details: newDescription,
    };
    console.log(payload);
    try {
      const response = await fetch("http://localhost:5005/skill/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.status === 201) {
        const newSkill = await response.json();
        navigate(`/skilldets/${newSkill._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSkill = async () => {
    try {
      const response = await fetch(`http://localhost:5005/skill/${skillid}`);
      if (response.status === 200) {
        const skill = await response.json();
        setTitle(skill.title);
        setCategory(skill.category);
        setDescription(skill.details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUpdating && skillid) {
      fetchSkill();
    }
  }, [isUpdating, skillid]);

  return (
    <>
      <h1>{isUpdating ? "Update your Skill" : "Create a new"}</h1>
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
    </>
  );
}

