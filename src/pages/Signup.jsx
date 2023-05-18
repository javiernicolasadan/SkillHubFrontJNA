import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({
        email: '',
        username: '',
        password: ''
    })


    const handleSubmit = async(event)=>{
        event.preventDefault()
        
        const response = await fetch('http://localhost:5005/auth/signup', {
        method:'POST', 
        headers:{
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({email: newUser.email, username:newUser.username, password:newUser.password})
    })
    console.log(response)
    if(response.status===201){
        navigate('/login')
    }
    }


  return (
    <form onSubmit={handleSubmit}>
        <div className="authField">
            <label>Email: </label>
            <input type="email" required value={newUser.email} 
            onChange={(e) => setNewUser((prevInput) => ({ ...prevInput, email: e.target.value }))}></input>
        </div>

        <div className="authField">
            <label>Username: </label>
            <input type="text" required value={newUser.username} onChange={(e) => setNewUser((prevInput) => ({ ...prevInput, username: e.target.value }))}></input>
        </div>

        <div className="authField">
            <label>Password: </label>
            <input type="password" required value={newUser.password} onChange={(e) => setNewUser((prevInput) => ({ ...prevInput, password: e.target.value }))}></input>
        </div>

        <button type="submit">Sign Up for free!</button>

    </form>
  )
}
