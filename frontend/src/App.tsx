import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
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
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check current session and role on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        // Get the role from user_metadata we set during creation
        setUserRole(session.user.user_metadata?.role || "STUDENT");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setUserRole(session.user.user_metadata?.role || "STUDENT");
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUserRole(null);
    setView("HOME");
  };

  // --- CONDITIONAL RENDERING ---

  // 1. If logged in, check the role
  if (session && userRole) {
    if (userRole === "ADMIN") {
      return (
        <AdminDashboard
          userEmail={session.user.email}
          onLogout={handleLogout}
        />
      );
    }

    // Default for Students (if you have a student dashboard later)
    return (
      <div>
        Welcome Student! Dashboard coming soon.{" "}
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // 2. If not logged in and user clicked Register
  if (view === "REGISTER") {
    return (
      <div className="register-page-wrapper">
        <Register onBack={() => setView("HOME")} />
      </div>
    );
  }

  // 3. Default: Landing Page
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
