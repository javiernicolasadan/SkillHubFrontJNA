import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newUser.email,
          username: newUser.username,
          password: newUser.password,
        }),
      }
    );
    console.log(response);
    if (response.status === 201) {
      navigate("/login");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message);
    }
  };

  return (
    <div className="authForm">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Email: </label>
        <input type="email" className="form-control" required value={newUser.email} onChange={(e) => {
            setNewUser((prevInput) => ({
              ...prevInput,
              email: e.target.value,
            }));
            setErrorMessage(null);
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Username: </label>
        <input className="form-control"
          type="text"
          required
          value={newUser.username}
          onChange={(e) => {
            setNewUser((prevInput) => ({
              ...prevInput,
              username: e.target.value,
            }));
            setErrorMessage(null);
          }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password: </label>
        <input className="form-control"
          type="password"
          required
          value={newUser.password}
          onChange={(e) => {
            setNewUser((prevInput) => ({
              ...prevInput,
              password: e.target.value,
            }));
            setErrorMessage(null);
          }}
        />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {errorMessage === "Email already exists" && (
        <Link to={"/login"}>Login</Link>
      )}

      <div className="submitDiv">
        <button type="submit" className="transButton">Sign up now!</button>
      </div>
      
    </form>
    </div>
  );
}
