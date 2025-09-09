import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./login.css";
import { Link, Routes, Route, useNavigate } from "react-router-dom";


export default function LoginPage () {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    const defaultUsername = "admin"
    const defaultPassword = "user@123"
    e.preventDefault(); // Prevent page refresh
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password.length > 40) {
      setError("Password must not exceed 40 characters");
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,40}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one number and one special character"
      );
      return;
    }

      if (password == defaultPassword && username == defaultUsername) {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
        navigate("/controls");
        console.log("Login success:", response.data);
        setError(""); // Clear error on success
      } else{
          console.error(err);
          setError("Invalid Credentials");
      }

  };

  return (
    <section id="body">
      <div className="overall">
        <div>
          <p className="text1">Login</p>
        </div>
        <form className="group2" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          {error && <p className="error">{error}</p>}

          <div className="btn-top aa">
            <button className="btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
