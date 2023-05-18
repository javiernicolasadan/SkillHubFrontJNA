import { useState } from "react"

export default function AddEvent() {

    const  [newTitle, setTitle] = useState("")
    const  [newDate, setDate] = useState("")
    const  [newLocationType, setLocatioType] = useState("online")
    const  [newDescription, setDescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("New Event created:", newTitle, newDate, newLocationType, newDescription)
      }

  return (
    <form onSubmit={handleSubmit}>
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
        <button type="submit">Create Event:</button>
       </div>

    </form>
  )
}
