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
    const {setNeedRefreshUser} = useContext(SessionContext)
    const navigate= useNavigate()

    const fetchSkillData = async()=>{
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/skill/${skillid}`)
      if(response.status === 200){
        const parsed = await response.json()
        setSelectedSkill(parsed)
      }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const fData = new FormData() 
        const imageUrl = e.target.imageUrl.files[0]
        fData.append("title", newTitle )
        fData.append("date", newDate)
        fData.append("locationType", newLocationType)
        fData.append("description", newDescription)
        fData.append("imageUrl", imageUrl)
        fData.append("skillid", skillid )
        
          console.log(fData)
        
       
         try {
         const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/event/create`, fData 
                              
          ) 
          if (response.status === 201) {
            /* const newEvent = await response.json() */
            console.log(response.data)
            const newEvent = response.data
            setNeedRefreshUser(true)
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
    <div className="create ">
     <h1 >Schedule an event</h1>
     {selectedSkill && <h1>{selectedSkill.category} / {selectedSkill.title}</h1>}

    <form className="pageForms" encType="multipart/form-data" onSubmit={handleSubmit}>
       <div className="mb-3">
         <label className="form-label">Event Title:</label>
         <input className="form-control" type="text" name="title" value={newTitle} onChange={(e) => setTitle(e.target.value)} required></input>
       </div>

       <div className="mb-3">
        <label className="form-label">Date:</label>
        <input className="form-control" type="date" name="date" value={newDate} onChange={(e) => setDate(e.target.value)} required></input>
       </div>

       <div className="mb-3">
        <label className="form-label">Online/In-person:</label>
        <select className="form-select" type="text" name="locationType" value={newLocationType} onChange={(e) => setLocatioType(e.target.value)} required>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
         </select>
       </div>

       <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea className="form-control" type="text" name="description" value={newDescription} onChange={(e) => setDescription(e.target.value)} required></textarea>
       </div>

       <div className="mb-3">
        <label className="form-label">Image:</label>
          <input className="form-control" type="file" accept="image/jpg image/png" name="imageUrl" />
       </div>

       <div className="submitDiv">
        <button type="submit" className="transButton">Create Event</button>
       </div>
    </form>
    
    </div>
  )
}
