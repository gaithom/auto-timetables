/**
 * Main application component that sets up the routing and theme for the Timetable Forge application.
 * It includes a sidebar navigation and theme toggling functionality.
 */

import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TimetableProvider } from "./context/TimetableContext";
import "./styles/theme.css";
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
  
  // State for mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-button')) {
        setIsSidebarOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Get the current theme tokens based on the selected theme
  const currentTheme = themeTokens[theme] || themeTokens.dark;

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // Wrap the app with TimetableProvider to provide timetable data to all components
    <TimetableProvider>
      <Router>
        <div style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: currentTheme.mainBg,
          color: currentTheme.text,
          position: 'relative',
          paddingLeft: '0',
          '@media (max-width: 768px)': {
            paddingLeft: '0',
          },
        }}>
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-button"
            onClick={toggleSidebar}
            style={{
              display: 'none',
              position: 'fixed',
              top: '1rem',
              left: '1rem',
              zIndex: 110,
              background: 'var(--secondary)',
              border: 'none',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              '@media (max-width: 768px)': {
                display: 'block',
              },
            }}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="overlay"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 99,
                '@media (min-width: 769px)': {
                  display: 'none',
                },
              }}
              onClick={toggleSidebar}
            />
          )}
          {/* Sidebar */}
          <aside 
            ref={sidebarRef}
            style={{
              width: 250,
              backgroundColor: currentTheme.sidebarBg,
              borderRight: `1px solid ${currentTheme.sidebarBorder}`,
              padding: '20px 0',
              display: 'flex',
              flexDirection: 'column',
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: 100,
              transition: 'transform 0.3s ease-in-out',
              '@media (max-width: 768px)': {
                transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                boxShadow: isSidebarOpen ? '2px 0 10px rgba(0, 0, 0, 0.2)' : 'none',
              },
            }}
          >
            <div style={{ padding: '0 16px 20px' }}>
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
              
              <button
                onClick={handleToggleTheme}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: `1px solid ${currentTheme.toggleBorder}`,
                  backgroundColor: currentTheme.toggleBg,
                  color: currentTheme.toggleText,
                  cursor: 'pointer',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>

            <nav style={{ flex: 1 }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 16px',
                    margin: '4px 16px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    color: isActive ? currentTheme.navActiveBorder : currentTheme.navInactive,
                    backgroundColor: isActive ? currentTheme.navActiveBg : 'transparent',
                    border: isActive ? `1px solid ${currentTheme.navActiveBorder}` : '1px solid transparent',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: isActive ? currentTheme.navActiveBg : 'rgba(0,0,0,0.05)'
                    }
                  })}
                >
                  <span style={{ marginRight: 12 }}>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main style={{
            flex: 1,
            padding: '20px',
            paddingTop: '60px', // Add space for mobile menu button
            overflow: 'auto',
            backgroundColor: currentTheme.mainBg,
            marginLeft: '250px', // Offset for fixed sidebar
            width: 'calc(100% - 250px)', // Adjust width for sidebar
            '@media (max-width: 768px)': {
              marginLeft: '0',
              width: '100%',
              padding: '20px',
              paddingTop: '70px',
            },
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
