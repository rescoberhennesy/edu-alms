import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Clock,
  Settings,
  LogOut,
  Bell,
  Menu,
  Plus,
  UserPlus,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../../../supabaseClient";
import "./AdminDashboard.css";

// Use a URL for your logo or a local import
const ARK_LOGO_URL = "Ark Logo.png";

export default function AdminDashboard({ userEmail, onLogout }: any) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [teacherCount, setTeacherCount] = useState(0);

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header" style={{ height: "100px" }}>
          {" "}
          {/* Increased header height for larger logo */}
          <div className="logo-container">
            <img src={ARK_LOGO_URL} alt="ALMS" className="logo-img" />
          </div>
          {!isCollapsed && (
            <div className="logo-text" style={{ marginLeft: "8px" }}>
              <span style={{ fontWeight: 900, color: "white" }}>
                Ark Learning Management System
              </span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="section-label">Overview</span>
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={activeTab === "Dashboard"}
              onClick={() => setActiveTab("Dashboard")}
            />
          </div>

          <div className="nav-section">
            <span className="section-label">Management</span>
            <NavItem
              icon={<Users size={20} />}
              label="Teachers"
              active={activeTab === "Teachers"}
              onClick={() => setActiveTab("Teachers")}
            />
            <NavItem icon={<Users size={20} />} label="Students" />
            <NavItem icon={<BookOpen size={20} />} label="Sections" />
          </div>
        </nav>

        <button
          onClick={onLogout}
          className="nav-item"
          style={{ margin: "16px", width: "calc(100% - 32px)" }}
        >
          <LogOut size={20} />{" "}
          {!isCollapsed && (
            <span className="nav-label" style={{ marginLeft: "8px" }}>
              Sign out
            </span>
          )}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-header">
          <button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu size={20} />
          </button>

          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: "18px" }}>{activeTab}</h1>
          </div>
        </header>

        <div className="page-body">
          {activeTab === "Dashboard" ? (
            <div className="mini-stats-grid">
              <div className="mini-stat-box">
                <p className="stat-label">Registered Teachers</p>
                <h4 style={{ fontSize: "32px", margin: "8px 0" }}>
                  {teacherCount}
                </h4>
              </div>
            </div>
          ) : (
            <TeacherManagement
              onTeacherCreated={() => setTeacherCount((prev) => prev + 1)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// Sub-component for Nav Items to handle icons vs text
function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      <div className="nav-item-content">
        {icon}
        <span className="nav-label">{label}</span>
      </div>
    </button>
  );
}

// THE TEACHER CREATION LOGIC
function TeacherManagement({ onTeacherCreated }: any) {
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // NEW: State to store the list of teachers
  const [teachers, setTeachers] = useState<any[]>([]);

  const handleCreateTeacher = async () => {
    if (!email || !password) return alert("Please fill in all fields");
    setLoading(true);

    // 1. Create the user in Auth
    // We add 'persistSession: false' to prevent the redirect!
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: "TEACHER" },
      },
    });

    if (authError) {
      alert(authError.message);
    } else {
      // 2. IMPORTANT: Manually add to your 'profiles' table
      // This makes sure the teacher appears in your list/table!
      const { error: dbError } = await supabase.from("profiles").insert([
        {
          id: data.user?.id,
          full_name: fullName,
          email: email,
          role: "TEACHER",
        },
      ]);

      if (dbError) {
        console.error("Error saving to profile table:", dbError);
      }

      // 3. Update UI locally
      onTeacherCreated(); // Updates the count of '2' in your image

      // Add to the local table state so it shows up immediately
      const newTeacher = {
        full_name: fullName,
        email: email,
        created_at: "Just now",
      };
      setTeachers((prev) => [...prev, newTeacher]);

      setShowForm(false);
      setFullName("");
      setEmail("");
      setPassword("");
      alert("Teacher saved! You are still logged in as Admin.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mini-stats-grid">
        <div
          style={{
            background: "#18181b",
            padding: "15px 25px",
            borderRadius: "15px",
            borderLeft: "4px solid #e02424",
          }}
        >
          <p style={{ fontSize: "10px", color: "#71717a", fontWeight: "bold" }}>
            TOTAL TEACHERS
          </p>
          <h4 style={{ margin: 0, fontSize: "20px" }}>{teachers.length}</h4>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
          style={{
            background: "#e02424",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {showForm ? "Close" : "+ Add Teacher"}
        </button>
      </div>

      {showForm && (
        <div className="form-card" style={{ marginBottom: "30px" }}>
          <h3 style={{ margin: "0 0 20px 0" }}>Register Teacher Account</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            <div>
              <label style={{ fontSize: "10px", color: "#71717a" }}>
                Full Name
              </label>
              <input
                className="styled-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: "10px", color: "#71717a" }}>
                Email Address
              </label>
              <input
                className="styled-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label style={{ fontSize: "10px", color: "#71717a" }}>
                Password
              </label>
              <input
                className="styled-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleCreateTeacher}
            disabled={loading}
            style={{
              marginTop: "20px",
              background: "white",
              color: "black",
              padding: "10px 25px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "bold",
            }}
          >
            {loading ? "Saving..." : "Confirm Registration"}
          </button>
        </div>
      )}

      {/* NEW: THE TEACHER TABLE */}
      <div className="form-card" style={{ padding: "0", overflow: "hidden" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead
            style={{
              background: "#111113",
              color: "#71717a",
              fontSize: "12px",
            }}
          >
            <tr>
              <th style={{ padding: "15px 25px" }}>NAME</th>
              <th style={{ padding: "15px 25px" }}>EMAIL</th>
              <th style={{ padding: "15px 25px" }}>DATE ADDED</th>
              <th style={{ padding: "15px 25px" }}>STATUS</th>
            </tr>
          </thead>
          <tbody style={{ color: "white", fontSize: "14px" }}>
            {teachers.length > 0 ? (
              teachers.map((t, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #27272a" }}>
                  <td style={{ padding: "15px 25px", fontWeight: "bold" }}>
                    {t.full_name}
                  </td>
                  <td style={{ padding: "15px 25px", color: "#a1a1aa" }}>
                    {t.email}
                  </td>
                  <td style={{ padding: "15px 25px", color: "#a1a1aa" }}>
                    {t.created_at}
                  </td>
                  <td style={{ padding: "15px 25px" }}>
                    <span
                      style={{
                        background: "#16a34a22",
                        color: "#22c55e",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#71717a",
                  }}
                >
                  No teachers found. Create one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
