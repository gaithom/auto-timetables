/**
 * Main application component that sets up the routing and theme for the Timetable Forge application.
 * It includes a sidebar navigation and theme toggling functionality.
 */

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

// Import page components
import DashboardPage from "./components/pages/DashboardPage";
import ProgramsPage from "./components/pages/ProgramsPage";
import LecturersPage from "./components/pages/LecturersPage";
import CohortsPage from "./components/pages/CohortsPage";
import RoomsPage from "./components/pages/RoomsPage";
import TimetablesPage from "./components/pages/TimetablesPage";

export default function App() {
  // State for managing the current theme (dark/light mode)
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === 'light' ? 'light' : 'dark'; // Ensure only 'light' or 'dark'
  });

  // Theme configuration with color tokens for both light and dark modes
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
  };

  // Get the current theme tokens
  const currentTheme = themeTokens[theme] || themeTokens.dark;

  // Update the document body class and save theme preference when theme changes
  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between dark and light theme
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Navigation items for the sidebar
  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/programs", label: "Programs", icon: <BookOpen size={18} /> },
    { path: "/lecturers", label: "Lecturers", icon: <Users size={18} /> },
    { path: "/cohorts", label: "Cohorts", icon: <CalendarDays size={18} /> },
    { path: "/rooms", label: "Rooms", icon: <DoorOpen size={18} /> },
    { path: "/timetables", label: "Timetables", icon: <Calendar size={18} /> },
  ];

  return (
    // Wrap the app with TimetableProvider to provide timetable data to all components
    <TimetableProvider>
      {/* Set up client-side routing */}
      <Router>
        <div style={{
          display: "flex",
          minHeight: "100vh",
          background: currentTheme.appBg,
          color: currentTheme.text,
        }}>
          {/* Sidebar */}
          <aside style={{
            width: 240,
            padding: "24px 16px",
            borderRight: `1px solid ${currentTheme.sidebarBorder}`,
            background: currentTheme.sidebarBg,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
              padding: "0 8px"
            }}>
              <Calendar size={24} style={{ color: "#4caf50" }} />
              <h1 style={{
                fontSize: 20,
                fontWeight: 600,
                color: currentTheme.text,
                margin: 0
              }}>
                Auto Timetable
              </h1>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 8,
                    fontWeight: 500,
                    background: isActive ? currentTheme.navActiveBg : "transparent",
                    color: isActive ? currentTheme.text : currentTheme.navInactive,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    border: isActive 
                      ? `1px solid ${currentTheme.navActiveBorder}`
                      : "1px solid transparent",
                  })}
                >
                  {React.cloneElement(item.icon, { size: 18 })}
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div style={{ marginTop: "auto" }}>
              <button
                onClick={handleToggleTheme}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${currentTheme.toggleBorder}`,
                  background: currentTheme.toggleBg,
                  color: currentTheme.toggleText,
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={18} />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{
            flex: 1,
            padding: 24,
            overflow: "auto",
            background: currentTheme.mainBg,
          }}>
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
