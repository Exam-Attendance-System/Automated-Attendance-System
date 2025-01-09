import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
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
        <button type="submit"  onClick={handleNavigate} className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
