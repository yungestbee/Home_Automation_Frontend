import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Email() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState(null);
  const [message, setMessage] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  // Fetch current email when page loads
  useEffect(() => {
    fetch(`${apiUrl}/api/email`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.address) {
          setCurrentEmail(data.address);
        }
      })
      .catch((err) => console.error("Error fetching email:", err));
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${apiUrl}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: email }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Email Update Successful!",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
        navigate("/controls");
      } else {
        setMessage("❌ " + data.error || "Failed to update email");
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}
    >
      <h2>Email Notification Settings</h2>

      <p>
        <strong>Current Email:</strong>{" "}
        {currentEmail ? currentEmail : "No email set yet"}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter new email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "8px",
            width: "100%",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Save Email
        </button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
