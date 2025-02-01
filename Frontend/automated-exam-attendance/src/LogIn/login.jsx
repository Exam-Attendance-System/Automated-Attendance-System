import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const navigate = useNavigate();

  const checkUserValidity = async (userid) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user/isvalid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid }),
      });
      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error('Error checking user validity:', error);
      return false;
    }
  };
  function setSessionItem(key, value, expirationInMinutes) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + expirationInMinutes * 60000, // Convert minutes to milliseconds
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  const getSessionItem = (key) => {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userid = getSessionItem('session_id'); // Ensure you're using the correct key
      if (userid) {
        const valid = await checkUserValidity(userid);
        setIsLoggedIn(valid);
        if (valid) {
          navigate("/dashboard"); // Redirect to dashboard if valid
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, [navigate]); // Add navigate to the dependency array

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Show a loading state while checking login status
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://automated-attendance-system.onrender.com/api/user/login", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: Email, password: Password }),
    })
      .then((response) => response.json())
      .then((data) => {
      if (data.message === 'Login successful') {
        setSessionItem("session_id", data.user_id, 30);
        navigate("/dashboard");
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
