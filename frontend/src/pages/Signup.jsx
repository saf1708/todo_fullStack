import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      await api.post("/auth/sendotp", { email: form.email });
      navigate("/verify-otp", { state: form });
    } catch (error) {
      alert("Error sending OTP");
    }
  };

  return (
  <div className="auth-card">
    <h2>Create Account</h2>

    <input
      type="text"
      placeholder="Name"
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />
    <input
      type="email"
      placeholder="Email"
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />
    <input
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />
    <button onClick={handleSendOTP}>Send OTP</button>

    <div className="auth-link">
      Already have an account? <Link to="/login">Login</Link>
    </div>
  </div>
);
};

export default Signup;