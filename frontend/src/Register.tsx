import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

interface RegisterProps {
  onBack: () => void;
}

export default function Register({ onBack }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          role: "STUDENT",
        },
      },
    });

    if (error) setMessage(error.message);
    else setMessage("Success! Check your email for a verification link.");
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <button onClick={onBack} className="back-btn">
          <ArrowLeft size={14} /> BACK TO HOME
        </button>

        <img src="/Ark Logo.png" alt="ARK Logo" className="register-logo" />

        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join the ARK Education System</p>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label className="field-label">Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Enter your full name"
                required
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label className="field-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="name@edu.com"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="input-group">
            <label className="field-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#888",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="field-label">Confirm Password</label>
            <div className="input-with-icon">
              <ShieldCheck size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="register-btn">
            {loading ? "CREATING ACCOUNT..." : "Register"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "bold",
              backgroundColor: message.includes("Success")
                ? "#f0fdf4"
                : "#fef2f2",
              color: message.includes("Success") ? "#16a34a" : "#dc2626",
              border: `1px solid ${message.includes("Success") ? "#bbf7d0" : "#fecaca"}`,
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
