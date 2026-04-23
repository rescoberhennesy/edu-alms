import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { Eye, EyeOff } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
    } else {
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <button className="login-close" onClick={onClose}>
          {" "}
          ×{" "}
        </button>

        <div className="login-header">
          <img src="/Ark Logo.png" alt="ARK Logo" className="login-logo" />
          <h2> Welcome Arkadian! </h2>
          <p> Enter your credentials to access your dashboard. </p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <label> Email Address </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label> Password </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              style={{ width: "100%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "14px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#999",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="login-forgot">
            <a href="#"> Forgot password? </a>
          </div>

          {error && (
            <p
              style={{
                color: "#e02424",
                fontSize: "12px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button className="login-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Log in"}
          </button>
        </form>

        <div className="login-footer-link">
          Don't have an account?{" "}
          <button onClick={onSwitchToRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
