import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SkillDetails() {
  const { skillid } = useParams();
  console.log(skillid);
  const [skill, setSkill] = useState();

  const fetchSkill = async () => {
    try {
      const response = await fetch(`http://localhost:5005/skill/${skillid}`);
      if (response.status === 200) {
        const parsed = await response.json();
        console.log(parsed);
        setSkill(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSkill();
  }, []);

  useEffect(() => {
    console.log(skill);
  }, [skill]);

  return (
    <>
      {skill ? (
        <div>
        
          <h1>Details of {skill.title}</h1>
          <h2>{skill.details}</h2>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
    
}