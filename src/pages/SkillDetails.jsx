import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SkillDetails() {
  const { skillid } = useParams();
  const navigate = useNavigate()
  const [skill, setSkill] = useState();

  const fetchSkill = async () => {
    try {
      const response = await fetch(`http://localhost:5005/skill/${skillid}`);
      if (response.status === 200) {
        const parsed = await response.json();
        setSkill(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkill();
  }, []);

  /* useEffect(() => {
    console.log(skill);
  }, [skill]); */


const handleDelete = async () => {
  try {
    const response = await fetch(`http://localhost:5005/skill/${skillid}`, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      navigate('/allSkills')
    }
  } catch (error) {
    console.log(error)
    
  }
}

  return (
    <>
      {skill ? (
        <div>
          <h1>Details of {skill.title}</h1>
          <h2>{skill.details}</h2>
          <Link to={`/updateskill/${skillid}`}> Update </Link>
         <button type="button" onClick={handleDelete}> Delete </button>
         <Link to={`/addevent/${skillid}`}>Add event</Link>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}
