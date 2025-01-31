import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard", { state: {Email} });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/api/user/login", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: Email, password: Password }),
    })
      .then((response) => response.json())
      .then((data) => {
      if (data.message === 'Login successful') {
        sessionStorage.setItem("session_id", data.user_id);
        navigate("/dashboard", { state: {Email} });
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
      })
      .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
      });
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Log In</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <button type="submit"  onClick={handleSubmit} className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
