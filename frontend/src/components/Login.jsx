import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./AddLogin.css"
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", form);
      if (res.data.success) {
        navigate("/admin"); // 👈 go to Admin.jsx
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container" >
    <form className= "box" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
    </div>
  );
};

export default Login;
