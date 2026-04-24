import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; // Make sure this path is correct
import NavBar from "./components/MainPage/NavBar";
import Hero from "./components/MainPage/Hero";
import Footer from "./components/MainPage/Footer";
import "./App.css";
import Register from "./Register";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import "./index.css";

function App() {
  const [view, setView] = useState("HOME");
  const [session, setSession] = useState<any>(null);

  // 1. Listen for Auth Changes (Login/Logout/Register)
  useEffect(() => {
    // Check current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes (e.g., when the user clicks 'Register' or 'Login')
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Logout Logic
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setView("HOME");
  };

  // --- CONDITIONAL RENDERING ---

  // If user is logged in, show the Dashboard regardless of the 'view' state
  if (session) {
    return (
      <AdminDashboard userEmail={session.user.email} onLogout={handleLogout} />
    );
  }

  // If not logged in and user clicked Register
  if (view === "REGISTER") {
    return (
      <div className="register-page-wrapper">
        <Register onBack={() => setView("HOME")} />
      </div>
    );
  }

  // Default: Landing Page
  return (
    <div className="app-root">
      <NavBar onOpenRegister={() => setView("REGISTER")} />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

export default App;
