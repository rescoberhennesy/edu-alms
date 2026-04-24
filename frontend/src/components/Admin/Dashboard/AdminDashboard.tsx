import { useState } from "react";
import {
  Layers,
  LayoutDashboard,
  Users,
  BookOpen,
  Clock,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import "./AdminDashboard.css"; // IMPORTANT: Import your new CSS file here

export default function AdminDashboard({ userEmail, onLogout }: any) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box">
            <Layers className="text-white h-5 w-5" size={20} />
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: "18px" }}>
              ARK System
            </span>
            <p style={{ fontSize: "10px", color: "#a1a1aa", margin: 0 }}>
              ADMIN PORTAL
            </p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="section-label">Overview</span>
            <button
              className={`nav-item ${activeTab === "Dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("Dashboard")}
            >
              <div className="nav-item-content">
                <LayoutDashboard size={20} /> Dashboard
              </div>
            </button>
          </div>

          <div className="nav-section">
            <span className="section-label">Management</span>
            <button
              className={`nav-item ${activeTab === "Teachers" ? "active" : ""}`}
              onClick={() => setActiveTab("Teachers")}
            >
              <div className="nav-item-content">
                <Users size={20} /> Teachers
              </div>
              <span className="badge">3</span>
            </button>
            <button className="nav-item">
              <div className="nav-item-content">
                <Users size={20} /> Students
              </div>
            </button>
            <button className="nav-item">
              <div className="nav-item-content">
                <BookOpen size={20} /> Sections
              </div>
            </button>
          </div>

          <div className="nav-section">
            <span className="section-label">System</span>
            <button className="nav-item">
              <div className="nav-item-content">
                <Clock size={20} /> Logs
              </div>
            </button>
            <button className="nav-item">
              <div className="nav-item-content">
                <Settings size={20} /> Settings
              </div>
            </button>
          </div>
        </nav>

        <button
          onClick={onLogout}
          className="nav-item"
          style={{ margin: "16px", width: "calc(100% - 32px)" }}
        >
          <div className="nav-item-content">
            <LogOut size={20} /> Sign out
          </div>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-header">
          <div>
            <h1 style={{ margin: 0, fontSize: "20px" }}>{activeTab}</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#71717a" }}>
              Institutional Oversight
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Bell size={20} color="#a1a1aa" />
            <div className="admin-profile">
              <div className="avatar">A</div>
              <div className="text-left">
                <p style={{ fontSize: "12px", fontWeight: "bold", margin: 0 }}>
                  Admin
                </p>
                <p style={{ fontSize: "10px", color: "#71717a", margin: 0 }}>
                  {userEmail}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="page-body">
          {activeTab === "Dashboard" ? (
            <div className="stat-box" style={{ borderRadius: "40px" }}>
              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: 900,
                  margin: "0 0 16px 0",
                }}
              >
                Overview
              </h2>
              <div
                style={{
                  height: "4px",
                  width: "60px",
                  backgroundColor: "#e02424",
                  marginBottom: "24px",
                }}
              ></div>
              <p style={{ color: "#a1a1aa", fontSize: "18px" }}>
                Welcome to the ARK Command Center.
              </p>
            </div>
          ) : (
            <div className="teacher-view">
              <div className="stats-grid">
                <div className="stat-box">
                  <p className="stat-label">Total Teachers</p>
                  <h4 className="stat-value">24</h4>
                  <p
                    style={{
                      color: "#16a34a",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    +2 this month
                  </p>
                </div>
                <div className="stat-box">
                  <p className="stat-label">Departments</p>
                  <h4 className="stat-value">6</h4>
                </div>
                <div className="stat-box">
                  <p className="stat-label">Pending</p>
                  <h4 className="stat-value">1</h4>
                  <p
                    style={{
                      color: "#f97316",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Needs Attention
                  </p>
                </div>
              </div>

              <div className="form-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "32px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>Register new teacher</h3>
                  <div
                    style={{
                      display: "flex",
                      background: "#111113",
                      padding: "4px",
                      borderRadius: "12px",
                    }}
                  >
                    <button
                      style={{
                        background: "#18181b",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      Account info
                    </button>
                    <button
                      style={{
                        background: "transparent",
                        color: "#71717a",
                        border: "none",
                        padding: "6px 12px",
                        fontSize: "11px",
                      }}
                    >
                      Credentials
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-wrapper">
                    <label>First Name</label>
                    <input className="styled-input" value="Maria" readOnly />
                  </div>
                  <div className="input-wrapper">
                    <label>Last Name</label>
                    <input className="styled-input" value="Santos" readOnly />
                  </div>
                  <div className="input-wrapper">
                    <label>Department</label>
                    <input
                      className="styled-input"
                      value="Mathematics"
                      readOnly
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "16px",
                  }}
                >
                  <button
                    style={{
                      background: "transparent",
                      color: "white",
                      border: "1px solid #27272a",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Clear
                  </button>
                  <button className="btn-primary">+ Create account</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
