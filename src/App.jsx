import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TimetableProvider } from "./context/TimetableContext";
import { LayoutDashboard, BookOpen, Users, CalendarDays, DoorOpen } from "lucide-react";

import DashboardPage from "./components/pages/DashboardPage";
import ProgramsPage from "./components/pages/ProgramsPage";
import LecturersPage from "./components/pages/LecturersPage";
import CohortsPage from "./components/pages/CohortsPage";
import RoomsPage from "./components/pages/RoomsPage";

export default function App() {
  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/programs", label: "Programs", icon: <BookOpen size={18} /> },
    { path: "/lecturers", label: "Lecturers", icon: <Users size={18} /> },
    { path: "/cohorts", label: "Cohorts", icon: <CalendarDays size={18} /> },
    { path: "/rooms", label: "Rooms", icon: <DoorOpen size={18} /> },
  ];

  return (
    <TimetableProvider>
      <Router>
        <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb", color: "#111827" }}>
          {/* Sidebar */}
          <aside
            style={{
              width: 240,
              background: "#ffffff",
              borderRight: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              padding: "20px 16px",
            }}
          >
            <h2 style={{ marginBottom: 32, fontWeight: "bold", fontSize: 18 }}>Auto Timetable</h2>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 12px",
                    borderRadius: 8,
                    fontWeight: 500,
                    background: isActive ? "#6366f1" : "#f3f4f6",
                    color: isActive ? "#fff" : "#111827",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  })}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, padding: 24 }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/lecturers" element={<LecturersPage />} />
              <Route path="/cohorts" element={<CohortsPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TimetableProvider>
  );
}
