import { useContext, useState } from "react"
import { SessionContext } from "../contexts/SessionContext"
import { Link, useNavigate } from "react-router-dom"
    

export default function Login() {
    const {setToken} = useContext(SessionContext)

    const navigate = useNavigate()
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
            setToken(tokenFromResp)
            navigate('/profile')
        }
    }

  return (
    <>
    <Link to={'/profile'}>Profile Page</Link>
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
    </>
  )
}
