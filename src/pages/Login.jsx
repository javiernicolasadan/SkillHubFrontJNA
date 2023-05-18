import { useState } from "react"
/* import { useNavigate } from "react-router-dom" */
    

export default function Login() {
    /* const navigate = useNavigate() */
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async(event)=>{
        event.preventDefault()
        const response = await fetch('http://localhost:5005/auth/login',{
            method:'POST', headers:{
                'Content-Type':'application/json'
            }, body:JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
        if(response.status === 200){
            const tokenFromResp = await response.json()
            console.log(tokenFromResp)
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="authField">
            <label>Email: </label>
            <input type="email" required value={user.email} 
            onChange={(e) => setUser((prevInput) => ({ ...prevInput, email: e.target.value }))}></input>
        </div>

        <div className="authField">
            <label>Password: </label>
            <input type="password" required value={user.password} onChange={(e) => setUser((prevInput) => ({ ...prevInput, password: e.target.value }))}></input>
        </div>

        <button type="submit">Log In</button>

    </form>
  )
}
