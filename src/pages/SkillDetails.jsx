import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";

export default function SkillDetails() {
  const { skillid } = useParams();
  const { currentUser } = useContext(SessionContext);
  const [skill, setSkill] = useState();
  const navigate = useNavigate()

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
    
    useEffect(()=>{
      fetchSkill()
    },[])

    /* useEffect(()=>{
      console.log(skill)
    },[skill]) */
  

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

const handleSubs = async(eventId)=>{
  const response = await fetch(`http://localhost:5005/event/subscribe/${eventId}`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userId: currentUser._id})
  }
  )
}

  return (
    <>
      {skill ? (
      <div>
      <h1>Details of {skill.title}</h1>
          <h2>{skill.details}</h2>
          <Link to={`/update/${skillid}`}> Update </Link>
         <button type="button" onClick={handleDelete}> Delete </button>
         <Link to={`/addevent/${skillid}`}>Add event</Link>
        
        {skill.events.length > 0 ? (
          <>
          <h3>Events</h3>
          {skill.events.map((eachEvent)=>{
            return (
            <div key={eachEvent._id} className="eventDiv">
              <h4>{eachEvent.title}</h4>
              <p>{eachEvent.locationType}</p>
              <Link to={`/eventdets/${eachEvent._id}`}>More details</Link>
              <button onClick={() => (handleSubs(eachEvent._id))}>Subscribe</button>
            </div>)
          })}
          </>
        
        ):(
        
          <p>No events to show</p>
        )}
      </div>

      ) : (

      <p>Loading...</p>
      )
      }
    </>
  );
}
