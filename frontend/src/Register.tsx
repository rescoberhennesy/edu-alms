import React, { useState } from "react";
import { supabase } from "./supabaseClient"; // Kept as ./ because both are in src
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

// 1. Define the type for the onBack prop
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
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-slate-900">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-xs text-slate-400 hover:text-blue-600 mb-6 transition-colors font-bold"
      >
        <ArrowLeft className="w-3 h-3 mr-1" /> BACK TO HOME
      </button>

      <h2 className="text-2xl font-bold mb-1 tracking-tight">Create Account</h2>
      <p className="text-slate-500 text-xs mb-6">
        Join the ARK Education System
      </p>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-[#e02424] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#c81e1e] transition-all disabled:opacity-50"
        >
          {loading ? "CREATING ACCOUNT..." : "REGISTER"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center text-xs font-medium p-2 rounded ${
            message.includes("Success")
              ? "bg-blue-50 text-blue-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
