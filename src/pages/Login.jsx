import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { setToken, setIsLoggedIn } = useContext(SessionContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });
    if (response.status === 200 || response.status === 304) {
      const tokenFromResp = await response.json();
      setToken(tokenFromResp);
      setIsLoggedIn(true);
      navigate("/profile");
    } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
    }
  };

  return (
    <>
    <div className="authForm">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email: </label>
          <input className="form-control"
            type="email"
            required
            value={user.email}
            onChange={(e) =>
              setUser((prevInput) => ({ ...prevInput, email: e.target.value }))
            }
          ></input>
        </div>

        <div className="mb-3">
          <label className="form-label">Password: </label>
          <input className="form-control"
            type="password"
            required
            value={user.password}
            onChange={(e) =>
              setUser((prevInput) => ({
                ...prevInput,
                password: e.target.value,
              }))
            }
          ></input>
        </div>

        <div className="submitDiv">
          <button className="transButton" type="submit">Log In</button>
        </div>
        
        {errorMessage && <p>{errorMessage}</p>}
        {errorMessage === "User not found." && <Link to={"/signup"}>Sign Up</Link>}

      </form>
      
    </div>
    </>
  );
}
