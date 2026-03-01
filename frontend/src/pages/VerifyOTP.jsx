import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const form = location.state;

  if (!form) {
    return <div>Invalid access</div>;
  }

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter complete 6 digit OTP");
      return;
    }

    try {
      await api.post("/auth/signup", { ...form, otp: finalOtp });
      navigate("/login");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-card">
      <h2>Enter OTP</h2>

      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-box"
          />
        ))}
      </div>

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default VerifyOTP;