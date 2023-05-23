import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { SessionContext } from "../contexts/SessionContext"
import  axios  from "axios"

export default function AddEvent() {

    const [newTitle, setTitle] = useState("")
    const [newDate, setDate] = useState("")
    const [newLocationType, setLocatioType] = useState("online")
    const [newDescription, setDescription] = useState("")
    const [selectedSkill, setSelectedSkill] = useState()
    const {skillid} = useParams()
    const { currentUser } = useContext(SessionContext)
    const navigate= useNavigate()

    const fetchSkillData = async()=>{
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/${skillid}`)
      if(response.status === 200){
        const parsed = await response.json()
        setSelectedSkill(parsed)
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const fData = new FormData() 
        const image = e.target.imageUrl.files[0]
        fData.append("title", newTitle )
        fData.append("date", newDate)
        fData.append("locationType", newLocationType)
        fData.append("description", newDescription)
        fData.append("imageUrl", image)
        fData.append("skillTitle", selectedSkill.title )
        fData.append("skillid", selectedSkill._id )
        
          console.log(fData)
        
       
         try {
         const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/event/create`, fData 
                              
          ) 
          if (response.status === 201) {
            /* const newEvent = await response.json() */
            console.log(response.data)
            const newEvent = response.data
            navigate(`/eventdets/${newEvent._id}`)
            
          }
        } catch (error) {
         console.log(error) 
        } 
      } 

      useEffect(()=>{
        fetchSkillData()
      },[]) 
      

  return (
    <>
    {/* {selectedSkill ?
    <>
    <h2>Category: {selectedSkill.category}</h2>
    <h3>{selectedSkill.title}</h3>
    <h3>Created by: {currentUser.username}</h3>
    </>
    :
    <p>Loading...</p>} */}

    <form encType="multipart/form-data" onSubmit={handleSubmit}>
       <div>
         <label>Event Title:</label>
         <input type="text" name="title" value={newTitle} onChange={(e) => setTitle(e.target.value)} required></input>
       </div>

       <div>
        <label>Date:</label>
        <input type="date" name="date" value={newDate} onChange={(e) => setDate(e.target.value)} required></input>
       </div>

       <div>
        <label>Online/In-person:</label>
        <select type="text" name="locationType" value={newLocationType} onChange={(e) => setLocatioType(e.target.value)} required>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
         </select>
       </div>

       <div>
        <label>Description:</label>
        <textarea type="text" name="description" value={newDescription} onChange={(e) => setDescription(e.target.value)} required></textarea>
       </div>

       <div>
        <label>
          <input type="file" accept="image/jpg image/png" name="imageUrl" />
        </label>

       </div>

       <div>
        <button type="submit">Create Event:</button>
       </div>

    </form>
    </>
  )
}
