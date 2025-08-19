import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TimetableProvider } from "./context/TimetableContext";

import DashboardPage from "./components/pages/DashboardPage";
import ProgramsPage from "./components/pages/ProgramsPage";
import LecturersPage from "./components/pages/LecturersPage";
import CohortsPage from "./components/pages/CohortsPage";
import RoomsPage from "./components/pages/RoomsPage";

export default function App() {
  return (
    <TimetableProvider>
      <Router>
        <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb", color: "#111827" }}>
          <aside style={{ width: 220, padding: 20, background: "#ffffff", borderRight: "1px solid #e5e7eb" }}>
            <h2 style={{ marginBottom: 24 }}>Auto Timetable</h2>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <NavLink to="/" style={({ isActive }) => ({ padding: 8, borderRadius: 8, background: isActive ? "#6366f1" : "#f3f4f6", color: isActive ? "#fff" : "#111827", textDecoration: "none" })}>Dashboard</NavLink>
              <NavLink to="/programs" style={({ isActive }) => ({ padding: 8, borderRadius: 8, background: isActive ? "#6366f1" : "#f3f4f6", color: isActive ? "#fff" : "#111827", textDecoration: "none" })}>Programs</NavLink>
              <NavLink to="/lecturers" style={({ isActive }) => ({ padding: 8, borderRadius: 8, background: isActive ? "#6366f1" : "#f3f4f6", color: isActive ? "#fff" : "#111827", textDecoration: "none" })}>Lecturers</NavLink>
              <NavLink to="/cohorts" style={({ isActive }) => ({ padding: 8, borderRadius: 8, background: isActive ? "#6366f1" : "#f3f4f6", color: isActive ? "#fff" : "#111827", textDecoration: "none" })}>Cohorts</NavLink>
              <NavLink to="/rooms" style={({ isActive }) => ({ padding: 8, borderRadius: 8, background: isActive ? "#6366f1" : "#f3f4f6", color: isActive ? "#fff" : "#111827", textDecoration: "none" })}>Rooms</NavLink>
            </nav>
          </aside>

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
