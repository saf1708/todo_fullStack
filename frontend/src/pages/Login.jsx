import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", { email, password });
      login();
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
  <div className="auth-card">
    <h2>Welcome Back</h2>
    <form onSubmit={handleSubmit} autoComplete="on" >
        <input
            type="email"
            name="username"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            name="password"
             placeholder="Enter your Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit">Login</button>
    </form>

    <div className="auth-link">
      Don't have an account? <Link to="/signup">Signup</Link>
    </div>
  </div>
);
};

export default Login;