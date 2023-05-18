import { useState } from "react"

export default function Signup() {
    const [newUser, setNewUser] = useState({
        email: '',
        username: '',
        password: ''
    })


    const handleSubmit = (event)=>{
        event.preventDefault()
        console.log(newUser.email, newUser.password, newUser.username)
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
