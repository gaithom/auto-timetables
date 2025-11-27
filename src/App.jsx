import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TimetableProvider } from "./context/TimetableContext";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarDays,
  DoorOpen,
  Calendar,
  Sun,
  Moon,
} from "lucide-react";

import DashboardPage from "./components/pages/DashboardPage";
import ProgramsPage from "./components/pages/ProgramsPage";
import LecturersPage from "./components/pages/LecturersPage";
import CohortsPage from "./components/pages/CohortsPage";
import RoomsPage from "./components/pages/RoomsPage";
import TimetablesPage from "./components/pages/TimetablesPage";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  const themeTokens = {
    dark: {
      appBg: "#1e1e1e",
      text: "#ffffff",
      sidebarBg: "#1e1e1e",
      sidebarBorder: "#2d2d2d",
      navActiveBg: "#2d5a27",
      navActiveBorder: "#3a7a33",
      navInactive: "#a0a0a0",
      toggleBg: "#2d2d2d",
      toggleBorder: "#3a3a3a",
      toggleText: "#ffffff",
      mainBg: "#121212",
    },
    light: {
      appBg: "#f5f7fb",
      text: "#111827",
      sidebarBg: "#ffffff",
      sidebarBorder: "#e5e7eb",
      navActiveBg: "#d1fae5",
      navActiveBorder: "#34d399",
      navInactive: "#4b5563",
      toggleBg: "#f3f4f6",
      toggleBorder: "#e5e7eb",
      toggleText: "#111827",
      mainBg: "#ffffff",
    },
  }[theme];

  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/programs", label: "Programs", icon: <BookOpen size={18} /> },
    { path: "/lecturers", label: "Lecturers", icon: <Users size={18} /> },
    { path: "/cohorts", label: "Cohorts", icon: <CalendarDays size={18} /> },
    { path: "/rooms", label: "Rooms", icon: <DoorOpen size={18} /> },
    { path: "/timetables", label: "Timetables", icon: <Calendar size={18} /> },
  ];

  return (
    <TimetableProvider>
        <Router>
          <div
            style={{
              display: "flex",
              minHeight: "100vh",
              background: themeTokens.appBg,
              color: themeTokens.text,
            }}
          >
            {/* Sidebar */}
            <aside
              style={{
                width: 240,
                background: themeTokens.sidebarBg,
                borderRight: `1px solid ${themeTokens.sidebarBorder}`,
                display: "flex",
                flexDirection: "column",
                padding: "20px 16px",
              }}
            >
              <h2 style={{ 
                marginBottom: 32, 
                fontWeight: "bold", 
                fontSize: 18, 
                color: "#4caf50",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Calendar size={20} />
                Auto Timetable
              </h2>
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
                      background: isActive ? themeTokens.navActiveBg : "transparent",
                      color: isActive ? themeTokens.text : themeTokens.navInactive,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      border: isActive
                        ? `1px solid ${themeTokens.navActiveBorder}`
                        : "1px solid transparent",
                    })}
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <button
                type="button"
                onClick={handleToggleTheme}
                style={{
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${themeTokens.toggleBorder}`,
                  background: themeTokens.toggleBg,
                  color: themeTokens.toggleText,
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </aside>

            {/* Main Content */}
            <main
              style={{
                flex: 1,
                padding: 24,
                overflow: "auto",
                background: themeTokens.mainBg,
              }}
            >
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/lecturers" element={<LecturersPage />} />
                <Route path="/cohorts" element={<CohortsPage />} />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/timetables" element={<TimetablesPage />} />
              </Routes>
            </main>
          </div>
        </Router>
    </TimetableProvider>
  );
}
