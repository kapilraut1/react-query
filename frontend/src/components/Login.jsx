import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./AddLogin.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", form);
      const { token } = res.data;

      localStorage.setItem("access_token", token);
      toast.success("Login successful!");

      navigate("/admin");
    } catch (err) {
      toast.error("Invalid email or password");
      console.log(err);
    }
  };

  return (
    <div className="container" >
    <form className= "box" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
